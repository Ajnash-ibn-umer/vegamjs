import { debug } from "console";
import * as http from "http";
import {
  bodylessMethods,
  bodyMethods,
  supportedMethods,
} from "./utils/httpMethods";
import readBody from "./body";

export default async function handleRequest(
  _req: http.IncomingMessage | any,
  _res: Response
) {

  if (bodylessMethods.has(_req.method)) {
    handler.apply(this, [_req, _res]);
  }
  if (bodyMethods.has(_req.method)) {
    console.log("in request")
    await readBody(_req);
    handler.apply(this, [_req, _res]);
  }
}

function handler(_req: http.IncomingMessage | any, _res: Response) {
  this.router.lookup(_req, _res);
}
