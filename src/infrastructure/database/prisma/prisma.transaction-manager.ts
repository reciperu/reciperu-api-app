import { Injectable } from '@nestjs/common';
import { ITransactionManager } from 'src/domain';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(private clientManager: PrismaService) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await this.clientManager.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      const res = await callback();
      this.clientManager.setClient(this.clientManager.getClient());

      return res;
    });
  }
}
