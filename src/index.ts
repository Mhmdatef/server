import express, { Request, Response } from "express";
import bodyParser, { json } from "body-parser";
import { router } from "./Routes/LoginRoutes";
import cookieSession from "cookie-session";
const app = express();

class Server {
  app: express.Express = express();
  constructor() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieSession({ keys: ["fdsfsdfs"] }));
    this.app.use(router);
  }
  start(): void {
    this.app.listen(3000, () => {
      console.log("listening on port 3000😜😜😜😜");
    });
  }
}
new Server().start();
