import fs from "fs";
import Fastify from "fastify";
import routes from "./routes";

const fastify = Fastify({
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync("./scripts/ssl/localhost.key"),
    cert: fs.readFileSync("./scripts/ssl/localhost.crt")
  },
  logger: {
    level: "error"
  }
});

fastify.register(routes);

const PORT = 4000;
fastify.listen(PORT, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
