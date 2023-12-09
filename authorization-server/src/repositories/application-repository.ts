// AplicationRepository.ts (Repositório)
import { PrismaClient, Aplicacao } from '@prisma/client';

/** Esse Repository faz o cadastro dos dados usando o `Prisma`.
 *  Para ele reconhecer os Schemas, execute:
 *
 *  prisma migrate dev --name init
 *  prisma generate
 *
 * */
export class AplicationRepository {
  constructor(private prisma: PrismaClient) {}

  async cadastrarAplicacao(aplicacaoData: Aplicacao) {
    return this.prisma.aplicacao.create({
      data: aplicacaoData
    });
  }
}
