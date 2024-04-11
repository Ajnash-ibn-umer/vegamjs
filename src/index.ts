import * as http from "http";
import Route from "route-parser";
/**
 * 
 *routetable stracture
 {
  "/path":{
    get:(req,res) => {

    }
  }
 }
 */

function createApplication() {
  let app: http.Server;
  const routesTables: Record<string, any> = {};
  function registerPath(
    path: string,
    cb: Function,
    method: string,
    middleware?: Function
  ) {
    if (!routesTables[path]) {
      routesTables[path] = {};
    }
    routesTables[path] = {
      ...routesTables[path],
      [method]: cb,
      [method + "-middleware"]: middleware,
    };
  }
  app = http.createServer(async (_req, _res) => {
    console.log(_req.url);

    if (_req.url) {
      const route: any = new Route(myRoute);
      const parsed = route.match(_req.url);
      console.log({ parsed });

      if (parsed && routesTables[parsed.spec]) {
        console.log("url matches");
      }
    }
  });

  return {
    get: (path: string, cb: Function) => registerPath(path, cb, "get"),

    listen: (...args: any[]) => {
      app.listen(...args);
    },
  };
}

export default createApplication;
