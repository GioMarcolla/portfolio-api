import serverless from "serverless-http";
import { createServer } from "../server.js";

const fastifyInstance = await createServer();

// Pass the Node.js HTTP server to serverless-http
export default serverless(fastifyInstance.server);