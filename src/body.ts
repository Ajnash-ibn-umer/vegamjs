import type http from "http";
import { CONTENT_TYPES } from "./utils/content-types";
import { Request } from "./type";

export default function readBody(req: Request) {
  return new Promise((resolve, reject) => {
    try {
      let bodyBuffer: Uint8Array[] = [];
      console.log("length", req.headers["content-type"]);

      req.on("data", (chunk) => {
        bodyBuffer.push(chunk);
      });

      req.on("end", () => {
        // concatenate and create new body
        let body = Buffer.concat(bodyBuffer).toString();

        if (
          req.headers["content-type"] ===
          CONTENT_TYPES.APPLICATION_X_WWW_FORM_URL_ENCODED
        ) {
          req.body = convertFormDataToJson(body);
        } else if (
          req.headers["content-type"] === CONTENT_TYPES.TEXT_HTML ||
          req.headers["content-type"] === CONTENT_TYPES.TEXT_PLAIN
        ) {
          req.body = { text: body };
        } else if(
          req.headers["content-type"] === CONTENT_TYPES.APPLICATION_JSON 
        ) {
          if (body !== "") resolve(JSON.parse(body));

          req.body = JSON.parse(body);
        }

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

function convertFormDataToJson(dataString: string): object {
  return dataString.split("&").reduce((result: any, param) => {
    const parts = param.split("=");
    result[parts[0]] = parts[1];
    return result;
  }, {});
}

function readMultiPartContentType(req: Request) {
  let contentTypeHeader: string = req.headers["content-type"] ?? "";
  let boundary =
    "--" + contentTypeHeader.split("; ")[1]?.replace("boundary=", "").trim();
  req.headers["content-type"] = contentTypeHeader.split("; ")[0].trim();
  return boundary;
}
