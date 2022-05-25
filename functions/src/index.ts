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
  const marketId: "btc-clp" | "eth-clp" | "ltc-clp" | "bch-clp" = "btc-clp";
  const apiKey: string = process.env.API_KEY || "";
  const apiSecret: string = process.env.API_SECRET || "";
  if (!apiKey || !apiSecret) {
    console.log("apiKey or apiSecret not present");
    return null;
  }
  const path: string = "/api/v2/markets/" + marketId + "/orders";
  const url:string = "https://www.buda.com" + path;
  const marketResponse: MarketResponse = await axios.get("https://www.buda.com/api/v2/markets/" + marketId);
  const amount = parseFloat(marketResponse.data.market.minimum_order_amount[0]) || coinValues[marketId];
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
