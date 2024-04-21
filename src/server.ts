import { EventEmitter } from "events";
import * as http from "http";
import findMyWay from "find-my-way";
import { Handler, HTTPVersion } from "find-my-way";
import { supportedMethods } from "./utils/httpMethods";
import { AppConfig } from "./types/router";
import {
  Context,
  MiddleWareHandler,
  Request,
  Response,
  RouterHandler,
} from "./types";
import readBody from "./body";
import bodyParser from "./body-parser";
import { responseGeneration } from "./response";
import compose from "./middlewares/compose";
import bp from "body-parser";
const { json, urlencoded } = bp;

import composeExpress from "./middlewares/composeExpress";

import fileUpload from "express-fileupload";

type ListenArgs = any[];

/**
 * This instance based on event emitter class
 *
 *@param {AppConfig}
 */
export default class createApplication extends EventEmitter {
  private readonly app: any;
  private middlewareStore: any[] = [];
  private appMiddlewareStore: any[] = [];

  private index = 0;
  private router: findMyWay.Instance<findMyWay.HTTPVersion.V1>;
  constructor(options?: AppConfig) {
    super();

    // Create router instance
    this.router =
      options != undefined
        ? findMyWay(options.routerOptions)
        : findMyWay({
            ignoreDuplicateSlashes: true,
          });
    const _bodyParserFile = fileUpload();
    const _bodyParserUrl = urlencoded({ extended: true });
    const _bodyParserJson = json();
    this.useExMid(_bodyParserFile);

    this.useExMid(_bodyParserUrl);
    this.useExMid(_bodyParserJson);

    // init server
    this.app = http.createServer(async (_req: any, _res: Response | any) => {
      try {
        responseGeneration.apply(_res);

        // const callback2 = compose(this.middlewareStore);
        // await Promise.resolve(callback2({req:_req,res: _res},null));
        const cb =  composeExpress(this.appMiddlewareStore);
       cb(_req, _res, ()=>{
        this.requestHandler(_req, _res);
       })
    

        // call body parser function as callback
        // bodyParser.call(this.app, _req, _res, async () => {
        // });
      } catch (error) {
        console.error(error);
        // handle global errors here
        _res.statusCode = 500;
        _res.end(`Error: ${String(error)}`);
      }
    });
  }

  // Port listening
  listen(port: number, ...args: ListenArgs) {
    this.app.listen(port, ...args);
  }

  requestHandler(_req: http.IncomingMessage | any, _res: Response) {
    console.log(_req.files)
    this.router.lookup(_req, _res);
  }
  use(method: MiddleWareHandler) {
    if (typeof method !== "function") {
      throw "Middleware  must be a function";
    }
    this.middlewareStore.push(method);

    return this;
  }
  useExMid(method: any) {
    if (typeof method !== "function") {
      throw "Middleware  must be a function";
    }
    this.appMiddlewareStore.push(method);

    return this;
  }
  // method handlers
  get(path: string, handler: RouterHandler) {
    this.router.on(
      supportedMethods.get,
      path,
      (req: any, res: any, params, store, searchParams) => {
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
      (req: any, res: any, params, store, searchParams) => {
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
      (req: any, res: any, params, store, searchParams) => {
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
      (req: any, res: any, params, store, searchParams) => {
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
      (req: any, res: any, params, store, searchParams) => {
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
      (req: any, res: any, params, store, searchParams) => {
        req["params"] = params;
        req["query"] = Object.assign({}, searchParams);
        handler({ req, res });
      }
    );
  }
}
