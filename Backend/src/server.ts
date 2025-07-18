import http from "http";
import { app, startDB } from "./app";

startDB().then(() =>
{
  let server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;

  server = http.createServer(app);

  const httpPort = 3000;

  server.listen(httpPort, "", () => {
    console.info(`\n\n\n\nserver starting on http://localhost:${httpPort}`);
  });
});
