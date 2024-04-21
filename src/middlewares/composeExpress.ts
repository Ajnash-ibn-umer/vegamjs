import { Context } from "../types";

export default  function compose(middleware: any[]) {
  if (!Array.isArray(middleware))
    throw new TypeError("Middleware stack must be an array!");
  for (const fn of middleware) {
    if (typeof fn !== "function")
      throw new TypeError("Middleware must be composed of functions!");
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return  function (req:any,res:any, next: any){
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i: number): Promise<any> {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) {

        fn = next;
      
      }
      if (!fn) return   Promise.resolve();
      try {
        console.log("middleware working",i,dispatch)
        return  Promise.resolve(fn(req,res, dispatch.bind(null, i + 1)));
      } catch (err) {
        return  Promise.reject(err);
      }
    }
  }
}
