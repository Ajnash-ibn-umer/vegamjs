import { EventEmitter } from "events";
import * as http from "http";
import findMyWay from "find-my-way";
import { Handler, HTTPVersion } from "find-my-way";
import { supportedMethods } from "./utils/httpMethods";
import { AppConfig } from "./types/router";
import { Context, MiddleWareHandler, Response, RouterHandler } from "./types";
import readBody from "./body";
import bodyParser from "./body-parser";
import { responseGeneration } from "./response";
import compose from "./middlewares/compose";

type ListenArgs = any[];

/**
 * This instance based on event emitter class
 */
export default class createApplication extends EventEmitter {
  private readonly app: any;
  private middlewareStore: any[] = [];
  private index = 0;
  private router: findMyWay.Instance<findMyWay.HTTPVersion.V1>;
  constructor(options: AppConfig) {
    super();

    // Create router instance
    this.router =
      options != undefined
        ? findMyWay(options.routerOptions)
        : findMyWay({
            ignoreDuplicateSlashes: true,
          });

    // init server
    this.app = http.createServer(async (_req: any, _res: Response | any) => {
      try {
        responseGeneration.apply(_res);
        const callback = compose(this.middlewareStore);


        // call body parser function as callback
        bodyParser.call(this.app, _req, _res, () => {
          callback({ req: _req, res: _res }, this.requestHandler(_req, _res));
        });
      } catch (error) {
        // handle global errors here
        _res.statusCode = 500;
        _res.text(`Error: ${String(error)}`);
      }
    });
  }

  // Port listening
  listen(port: number, ...args: ListenArgs) {
    this.app.listen(port, ...args);
  }

  requestHandler(_req: http.IncomingMessage, _res: Response) {
    this.router.lookup(_req, _res);
  }
  use(method: MiddleWareHandler) {
    if (typeof method !== "function") {
      throw "Middleware  must be a function";
    }
    this.middlewareStore.push(method);

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

