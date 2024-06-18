import { EventEmitter } from "events";
import  http from "http";

import  findMyWay from "find-my-way";
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
import { responseGeneration } from "./response";
import compose from "./middlewares/compose";
import bp from "body-parser";
const { json, urlencoded } = bp;

import composeExpress from "./middlewares/composeExpress";

const fileUpload = require('express-fileupload');

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

  private router: findMyWay.Instance<findMyWay.HTTPVersion.V1>;
  constructor(options?: AppConfig) {
    super();
    // Create router instance
    this.router =
      options != undefined
        ? findMyWay({...options.routerOptions,
          onBadUrl: (path, req, res) => {
            res.statusCode = 404;
            res.end(`Bad path: ${path}`);
          }})
        : findMyWay({
            ignoreDuplicateSlashes: true,
            onBadUrl: (path, req, res) => {
              res.statusCode = 400;
              res.end(`Bad path: ${path}`);
            },
          });
    if (options) {

      const _bodyParserFile = fileUpload(options.fileUploadOptions ? options.fileUploadOptions : {});
      const _bodyParserUrl = urlencoded({ extended: true });
      const _bodyParserJson = json();
      if (options?.plugins === undefined) {
        options.plugins = [_bodyParserFile, _bodyParserUrl, _bodyParserJson];
      } else {
        options.plugins = [
          _bodyParserFile,
          _bodyParserUrl,
          _bodyParserJson,
          ...options?.plugins,
        ];
      }
      this.plugins(options?.plugins as any);

    }
    // init server
    this.app = http.createServer(async (_req: any, _res: Response | any) => {
      try {
        responseGeneration.apply(_res);
        const pluginCallback = composeExpress(this.appMiddlewareStore);

        const middlewareCallback= compose(this.middlewareStore);

      
        pluginCallback(_req, _res,()=>{
          middlewareCallback({req:_req,res: _res},()=>{
            this.requestHandler(_req, _res)

          }) 
        }  );
      
      } catch (error) {
        console.error(error);
        // handle global errors here
        _res.statusCode = 500;
        _res.end(`Error: ${String(error)}`);
      }
    });
  }
  requestHandler(_req: http.IncomingMessage | any, _res: Response) {
    this.router.lookup(_req, _res);
  }

  // Port listening
  listen(port: number, ...args: ListenArgs) {
    this.app.listen(port, ...args);
  }

  use(method: MiddleWareHandler) {
    if (typeof method !== "function") {
      throw "Middleware  must be a function";
    }
    this.middlewareStore.push(method);

    return this;
  }
  
  private useExpressMiddleware(method: any) {
    // console.log(method);
    if (typeof method !== "function") {
      throw "Middleware  must be a function";
    }
    this.appMiddlewareStore.push(method);

    return this;
  }
  private plugins(plugins: any[]) {
    this.appMiddlewareStore = plugins;
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
