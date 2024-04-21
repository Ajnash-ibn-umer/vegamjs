import type http from "http";
import bp from "body-parser";
import { IncomingMessage, ServerResponse } from "http";
import { Context } from "./types";
const { json, urlencoded } = bp;
import fileUpload from "express-fileupload";

const _bodyParserFile = fileUpload();
const _bodyParserUrl = urlencoded({ extended: true });
const _bodyParserJon = json();

// export default () => {
//   return ({ req, res }: Context, next: () => void) => {
//     console.log("in bodyparser")
//     _bodyParserUrl(req, res, () => {
//       _bodyParserJon(req, res, () => next());
//     });
//   };
// };

export default (req: any, res: any, next: () => void) => {
  // _bodyParserFile(req, res, () => {
    _bodyParserUrl(req, res, () => {
      _bodyParserJon(req, res, () => next());
    });
  // });
};
