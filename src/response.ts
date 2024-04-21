const CONTENT_TYPE = {
  JSON: "application/json; charset=utf-8",
  PLAIN: "text/plain; charset=utf-8",
  OCTET: "application/octet-stream",
};

export function responseGeneration() {
  // TODO: status code setter
  try {
    this.text = function (body: any) {
      // console.log(typeof body);
      if (typeof body === "object") {
        this.json(body);
      } else if (typeof body === "string") {
        this.setHeader("Content-Type", CONTENT_TYPE.PLAIN);
        this.end(body, "utf8");
      } else {
        throw "Invalid body data";
      }
      return this;
    };

    this.json = function (body: any) {
      this.setHeader("Content-Type", CONTENT_TYPE.JSON);
      return this.end(JSON.stringify(body));
    };

    this.status = function (code: number) {
      this.statusCode = code;
      return this;
    };

    return this;
  } catch (error) {
    console.log({ error });
  }
}
