import EventEmitter from "events";
import * as http from "http";
import findMyWay, { Handler, HTTPVersion } from "find-my-way";
import { supportedMethods } from "./utils/httpMethods";
import { AppConfig } from "./types/router";
import { Context, RouterHandler } from "./types";
import readBody from "./body";
import bodyParser from "./body-parser";

type ListenArgs = any[];

class createApplication extends EventEmitter {
  private readonly app: any;
  private router: findMyWay.Instance<findMyWay.HTTPVersion.V1>;
  constructor(options: AppConfig) {
    super();
    this.router =
      options != undefined
        ? findMyWay(options.routerOptions)
        : findMyWay({
            ignoreDuplicateSlashes: true,
          });

    this.app = http.createServer(async (_req: any, _res) => {
     
      bodyParser.call(this, _req, _res as any,()=>{
        console.log("testing body", _req.body);
        const resp = this.router.lookup(_req, _res);
      });


    });
  }
  listen(port: number, ...args: ListenArgs) {
    this.app.listen(port, ...args);
  }

  // method handlers
  get(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.get,
      path,
      (req: any, res, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }
  post(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.post,
      path,
      (req: any, res, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }

  put(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.put,
      path,
      (req: any, res, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }
  delete(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.delete,
      path,
      (req: any, res, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }
  patch(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.patch,
      path,
      (req: any, res, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }
  head(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.head,
      path,
      (req: any, res, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }
}

export default createApplication;
