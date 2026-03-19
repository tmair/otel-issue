import express from "express";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(process.env.OTEL_LOG_LEVEL);

app.prepare().then(() => {
  const expressApp = express();

  expressApp.get("{*splat}", (req, res) => {
    return handle(req, res);
  });

  expressApp.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`,
    );
  });
});
