import { FastifyInstance } from "fastify";
import { TranscribeController } from "../controllers/transcribe.controller";
import { DiagnoseController } from "../controllers/diagnose.controller";


export async function transcribeRoutes(app: FastifyInstance) {
  const controller = new TranscribeController();

  app.post("/transcribe", controller.handle);

}

export async function diagnoseRoutes(app: FastifyInstance) {
  const controller = new DiagnoseController();

  app.post("/diagnose", controller.handle);
}