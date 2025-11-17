import { FastifyReply, FastifyRequest } from "fastify";
import { TranscribeService } from "../services/transcribe.service";

const service = new TranscribeService();

export class TranscribeController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    console.log('📥 Recebendo requisição de transcrição...');

    // Verifica se é multipart (arquivo de áudio)
    const data = await req.file();

    if (data) {
      console.log('🎵 Arquivo recebido:', data.filename, 'Tipo:', data.mimetype);
      // Recebeu arquivo
      const buffer = await data.toBuffer();
      console.log('📦 Tamanho do buffer:', buffer.length, 'bytes');
      const audioBase64 = buffer.toString('base64');

      const result = await service.transcribe({ audioBase64 });
      console.log('✅ Transcrição concluída:', result);
      return res.send(result);
    }

    // Se não tem arquivo, tenta pegar do body (texto)
    const body = req.body as { text?: string };

    if (body?.text) {
      console.log('📝 Texto recebido:', body.text);
      const result = await service.transcribe({ text: body.text });
      return res.send(result);
    }

    console.log('❌ Nenhum arquivo ou texto fornecido');
    return res.status(400).send({ error: 'Nenhum arquivo ou texto fornecido' });
  }
}
