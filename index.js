const binance   = require('node-binance-api');
var MongoClient = require('mongodb').MongoClient;
var url         = "mongodb://localhost:27017/";
var DB          = "Place_Your_DB_Name_Here";

/**
 * Initialize Binance API
 */
function insert()
{
    binance.prices((error, ticker) =>
    {
        for (var key in ticker)
        {
            binance.websockets.candlesticks([key], "1m", (candlesticks) => {
                let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
                let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db(DB);
                    var myobj = {
                        symbol: symbol,
                        eventType: eventType,
                        eventTime: eventTime,
                        timestamp: Date.now(),
                        ticks: {
                            open           : open,
                            high           : high,
                            low            : low,
                            close          : close,
                            volume         : volume,
                            trades         : trades,
                            interval       : interval,
                            isFinal        : isFinal,
                            quoteVolume    : quoteVolume,
                            buyVolume      : buyVolume,
                            quoteBuyVolume : quoteBuyVolume
                        }
                    };
                    dbo.collection("tickers").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log(symbol + " =>" + close);
                        db.close();
                    });
                });
            });
        }
    });
}

insert()