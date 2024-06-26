import type http from "http";
export type Request = {
  params: Record<string, any>;
  query: Record<string, any>;
  body: Record<string, any>;
  files: object;
} & http.IncomingMessage;

export type Response = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
} & {
  json: (body: any) => any;
  text: (body: any) => any;
  status: (code: number) => any;
};
export type Context = {
  req: Request;
  res: Response;
};

export type RouterHandler = (context: Context) => any;
export type MiddleWareHandler = (context: Context, next: () => any) => any;
export type PluginHandler = (
  req: http.IncomingMessage | any,
  res: any,
  next: () => any
) => any;
