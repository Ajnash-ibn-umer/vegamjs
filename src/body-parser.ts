import type http from "http";
import bp from "body-parser";
import { IncomingMessage, ServerResponse } from "http";
const { json, urlencoded } = bp;

const _bodyParserUrl = urlencoded({ extended: true });
const _bodyParserJon = json();

export default function (req: http.IncomingMessage, res: ServerResponse<IncomingMessage>,next:()=>void) {
   
    _bodyParserUrl(req, res, () => {
        _bodyParserJon(req, res, () => next());
      });

}
