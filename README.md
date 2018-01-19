# How to use

######This application requires `NodeJS` and `MongoDB`

It's a simple tool to retrieve data from Binance Websocket. Official documentation is [here!](https://github.com/binance-exchange/binance-official-api-docs)

Install required packages via `npm`
```
npm install mongodb
npm install node-binance-api
```

Set MongoDB connection at the top of `index.js` file before you run it
```
var url = "mongodb://localhost:27017/";
```

After you get ready to run your JS file run this command!

```
node index.js
```

Bob is your uncle!