import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { transcribeRoutes, diagnoseRoutes } from "./routes";

const app = Fastify();

app.register(cors, { origin: "*" });
app.register(multipart);

//prefixos de rotas
app.register(transcribeRoutes, { prefix: "/api" });
app.register(diagnoseRoutes, { prefix: "/api" });

export default app;