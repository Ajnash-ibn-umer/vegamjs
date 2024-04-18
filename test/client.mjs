import * as  app from "../dist/index.js";

const s = new app({
  routerOptions: {
    onBadUrl: (path, req, res) => {
      res.statusCode = 400;
      res.end(`Bad path: ${path}`);
    },
  },
});

s.listen(8001, () => {
  console.log("port running");
});
s.get("/test", ({ req, res }) => {
  console.log({ query: req.query });
  res.end("hai");
});
s.get("/query", ({ req, res }) => {
  console.log({ query: req.query });
  res.end("haiii");
});
