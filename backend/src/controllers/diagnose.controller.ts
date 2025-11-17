import { FastifyReply, FastifyRequest } from "fastify";
import { DiagnoseSchema } from "../schemas/diagnose.schema";
import { DiagnoseService } from "../services/diagnose.service";

const service = new DiagnoseService();

export class DiagnoseController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    console.log('📥 Recebendo requisição de diagnóstico...');
    console.log('Body:', req.body);

    const parsed = DiagnoseSchema.parse(req.body);
    console.log('✅ Schema validado:', parsed);

    const response = await service.diagnose(parsed.transcript);
    console.log('✅ Diagnóstico gerado:', response);

    return res.send(response);
  }
}
