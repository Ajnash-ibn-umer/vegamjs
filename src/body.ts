import type http from "http";

export default function readBody(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let bodyBuffer = "";
      if (req.headers["content-type"] === "application/form-data") {
        req.setEncoding("latin1");
      }
      if (
        req.method === "GET" ||
        req.method === "HEAD" ||
        req.method === "DELETE"
      ) {
        resolve(false);
      }
      req.on("data", (chunk) => {
        bodyBuffer += "" + chunk;
      });
      req.on("end", () => {
        if (bodyBuffer !== "") resolve(JSON.parse(bodyBuffer));

        resolve(false);
      });
      req.on("error", (err) => {
        reject(err);
      });
    } catch (error) {
      throw Error(error as string);
    }
  });
}
