# checkout-test

## Project setup
```
npm install
```
## Run Client

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build-client
```
`dist` directory is now ready to be deployed. Copy `dist` directory content to tomcat server. Vue config expected to 
be deployed under `/Stablecoin-Exchanger/` but that can be changed in `vue.config.js`

## Run Server

### Test

```
npm run dev
```

### Prod
```
npm run prod-server
```
To run in backgroud, use PM2. 
```
npm install pm2 -g
```
Then deploy process in PM2
```
pm2 start server/index.js
```

## Deployment to sandbox

We will install the Stablecoin Exchanger together with Obyte Issuing so they can comfortably communicate with each other.

Upload code (current directory should be stablecoin-exchanger):
```bash
scp -C -J none -P 2222 -i ~/.sandbox-cli/.sandbox_rsa -r "$(pwd)/../stablecoin-exchanger"  sandbox@obyte-issuing.peter-miklos.sb01.k8s.adyen.com:
```

Connect to sandbox:
```bash
sandbox-cli sandbox connect -n obyte-issuing
```

Install app and start it (don't forget to create the `.env` file, see further below)
```text
cd stablecoin-exchanger
npm --proxy http://sandboxproxy-vip.system.osext1.nlzwo1o.adyen.cloud:3128 install
npm run serve
```

**Configure Tomcat URLs:**
Modify `node_modules/@adyen/api-library/lib/src/client.js` `CHECKOUT_ENDPOINT_TEST` var to point to tomcat version. 

TODO: can we build it for production so it can run in the background?

Example `.env`
```text
PORT="8080"
ADYEN_MERCHANT_ACCOUNT="TestMerchant"
ADYEN_API_KEY="AQEmhmfuXNWTK0Qc+iSEl3cshO..."
ADYEN_CLIENT_KEY="devl_F73CCZ4Y7NHFRL"
ADYEN_HMAC_KEY="your_hmac_key_here"
```

Open [Stablecoin Exchanger](http://obyte-issuing.peter-miklos.sb01.k8s.adyen.com:8080/)
