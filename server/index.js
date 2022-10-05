const express = require("express")
const consola = require("consola")
const dotenv = require("dotenv")
const { createProxyMiddleware } = require("http-proxy-middleware")
const { hmacValidator } = require("@adyen/api-library")
const { Client, Config, CheckoutAPI } = require("@adyen/api-library")

// init app
const app = express(),
	port = 3000
// Configure Proxy - Uncomment with proper proxy
// app.use(
// 	"/",
// 	createProxyMiddleware({
// 		target: "",
// 		changeOrigin: true,
// 		pathRewrite: {
// 			[`^/api`]: ""
// 		}
// 		// headers: { - not sure if this is needed
// 		// 	"x-API-key": API_KEY[0]
// 		// }
// 	})
// )
// Parse JSON bodies
app.use(express.json())
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Enables environment variables by parsing the .env file and assigning it to process.env
dotenv.config({
	path: "./.env"
})

// Adyen Node.js API library boilerplate (configuration, etc.)
const config = new Config()
config.apiKey = process.env.ADYEN_API_KEY
const client = new Client({ config })
client.setEnvironment("TEST") // change to LIVE for production
const checkout = new CheckoutAPI(client)

/* ################# API ENDPOINTS ###################### */

// Invoke /sessions endpoint
app.post("/api/sessions", async (req, res) => {
	try {
		// unique ref for the transaction
		const orderRef = req.query.reference

		const protocol = req.socket.encrypted ? "https" : "http"
		const host = req.get("host")
		console.log("sessions request received")

		// Ideally the data passed here should be computed based on business logic
		const response = await checkout.sessions({
			amount: { currency: "EUR", value: 1000 }, // value is 10€ in minor units
			countryCode: "NL",
			merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT, // required
			reference: orderRef, // required: your Payment Reference
			returnUrl: `${protocol}://${host}/api/handleShopperRedirect?orderRef=${orderRef}` // set redirect URL required for some payment methods
		})
		res.json({ response, clientKey: process.env.ADYEN_CLIENT_KEY })
	} catch (err) {
		console.error(`Error: ${err.message}, error code: ${err.errorCode}`)
		res.status(err.statusCode).json(err.message)
	}
})

// Handle all redirects from payment type
app.all("/api/handleShopperRedirect", async (req, res) => {
	// Create the payload for submitting payment details
	const redirect = req.method === "GET" ? req.query : req.body
	const details = {}
	if (redirect.redirectResult) {
		details.redirectResult = redirect.redirectResult
	} else if (redirect.payload) {
		details.payload = redirect.payload
	}

	try {
		const response = await checkout.paymentsDetails({ details })
		// Conditionally handle different result codes for the shopper
		switch (response.resultCode) {
			case "Authorised":
				res.redirect("http://localhost:8080/result/success")
				break
			case "Pending":
			case "Received":
				res.redirect("http://localhost:8080/result/pending")
				break
			case "Refused":
				res.redirect("http://localhost:8080/result/failed")
				break
			default:
				res.redirect("/result/error")
				break
		}
	} catch (err) {
		console.error(`Error: ${err.message}, error code: ${err.errorCode}`)
		res.redirect("/result/error")
	}
})

/* ################# end API ENDPOINTS ###################### */

/* ################# WEBHOOK ###################### */

app.post("/api/webhooks/notifications", async (req, res) => {
	var ret = false

	// YOUR_HMAC_KEY from the Customer Area
	const hmacKey = process.env.ADYEN_HMAC_KEY
	const validator = new hmacValidator()
	// Notification Request JSON
	const notificationRequest = req.body
	const notificationRequestItems = notificationRequest.notificationItems

	// Handling multiple notificationRequests
	notificationRequestItems.every(function (notificationRequestItem) {
		const notification = notificationRequestItem.NotificationRequestItem

		// Handle the notification
		if (validator.validateHMAC(notification, hmacKey)) {
			// Process the notification based on the eventCode
			const merchantReference = notification.merchantReference
			const eventCode = notification.eventCode
			console.log(
				"merchantReference:" +
					merchantReference +
					" eventCode:" +
					eventCode
			)
			// notification ok
			ret = true
		} else {
			// invalid hmac: do not send [accepted] response
			console.log("Invalid HMAC signature: " + notification)
			// notification cannot be accepted
			ret = false
			return false // exit from loop
		}
	})

	if (ret) {
		res.send("[accepted]")
	} else {
		res.status(401).send("Invalid HMAC signature")
	}
})

/* ################# end WEBHOOK ###################### */

// Launch Express
app.listen(port, () => {
	console.log(`Server listening on the port::${port}`)
})
