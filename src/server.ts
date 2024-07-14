import { EventEmitter } from "events";
import type { EventEmitter as E } from "events";

import * as http from "http";
import findMyWay from "find-my-way";
import { supportedMethods } from "./utils/httpMethods";
import { AppConfig } from "./type/router";
import {
  Context,
  MiddleWareHandler,
  Request,
  Response,
  RouterHandler,
} from "./type";
import { responseGeneration } from "./response";
import compose from "./middlewares/compose";

import composeExpress from "./middlewares/composeExpress";

import fileUpload from "express-fileupload";
import handleRequest from "./handleRequest";

type ListenArgs = any[];

/**
 * This instance based on event emitter class
 *
 *@param {AppConfig}
 */
export default class CreateApp<E> extends EventEmitter {
  private readonly app: any;
  private middlewareStore: any[] = [];
  private appMiddlewareStore: any[] = [];

  private router: findMyWay.Instance<findMyWay.HTTPVersion.V1>;
  constructor(options?: AppConfig) {
    super();
    // Create router instance
    this.router =
      options != undefined
        ? findMyWay({
            ...options.routerOptions,
            onBadUrl: (path, req, res) => {
              res.statusCode = 404;
              res.end(`Bad path: ${path}`);
            },
          })
        : findMyWay({
            ignoreDuplicateSlashes: true,
            onBadUrl: (path, req, res) => {
              res.statusCode = 400;
              res.end(`Bad path: ${path}`);
            },
          });







    if (options) {
      const _bodyParserFile = fileUpload(
        options.fileUploadOptions ? options.fileUploadOptions : {}
      );
      options.plugins = [_bodyParserFile];

      if (options?.plugins !== undefined) {
        options.plugins.push(...options?.plugins);
      }

      this.plugins(options?.plugins as Function[]);
    }




    // init server
    this.app = http.createServer(async (_req: any, _res: Response | any) => {
      try {
        console.log("server");
        responseGeneration.apply(_res);
        const pluginCallback = composeExpress(this.appMiddlewareStore);

        const middlewareCallback = compose(this.middlewareStore);

        pluginCallback(_req, _res, () => {
          middlewareCallback({ req: _req, res: _res }, () => {
            handleRequest.apply(this, [_req, _res]);
          });
        });
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
  private plugins(plugins: Function[]) {
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
