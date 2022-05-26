import * as functions from "firebase-functions";
import axios from "axios";
import * as crypto from "crypto";
import {MarketResponse, OrderPayLoad} from "./models/buda";

const coinValues = {
  "btc-clp": 0.00002,
  "ltc-clp": 0.003,
  "eth.clp": 0.001,
  "bch-clp": 0.001,
};

exports.scheduledFunction = functions.pubsub.schedule("every 3 hours").onRun(async () => {
  const apiKey: string = process.env.API_KEY || "a";
  const apiSecret: string = process.env.API_SECRET || "a";
  if (!apiKey || !apiSecret) {
    console.log("apiKey or apiSecret not present");
    return null;
  }
  let amount: number;
  let errorMarket = {};
  let marketResponse = {} as MarketResponse;
  const marketId: "btc-clp" | "eth-clp" | "ltc-clp" | "bch-clp" = "btc-clp";
  const path: string = "/api/v2/markets/" + marketId + "/orders";
  const url:string = "https://www.buda.com" + path;
  const urlMarket: string = "https://www.buda.com/api/v2/markets/" + marketId;
  const configMkt = {
    method: "GET",
    url: urlMarket
  };
  [marketResponse, errorMarket] = await safePromise(axios(configMkt));
  if (errorMarket) {
    console.log("error getting market info, assigning default values");
    amount = coinValues[marketId];
  } else {
    amount = parseFloat(marketResponse.data.market.minimum_order_amount[0]);
  }
  const payLoad: OrderPayLoad = {
    type: "Bid",
    price_type: "market",
    amount,
  };
  const method = "POST";
  const nonce: number = Date.now();
  const msg: string = getMsg(payLoad, path, nonce, method);
  const apiSecretHash: string = crypto.createHmac("sha384", apiSecret).update(msg).digest("hex");

  const config = {
    method,
    url,
    headers: {
      "X-SBTC-APIKEY": apiKey,
      "X-SBTC-NONCE": nonce,
      "X-SBTC-SIGNATURE": apiSecretHash,
    },
    data: payLoad,
  };

  axios(config)
      .then((response: any) => console.log("response", response.data))
      .catch((error: any) => console.log("error", error.data));

  return null;
});


function getMsg(payload: OrderPayLoad, path: string, nonce: number, method: string ): string {
  const buff = Buffer.from(JSON.stringify(payload));
  const base64data = buff.toString("base64");
  const components = [method, path, base64data, nonce];
  return components.join(" ");
}

// better error handling for promises using async
async function safePromise(promise: Promise<any>):Promise<any[]> {
  return promise.then((data) => [data]).catch((error) => [null, error]);
}
