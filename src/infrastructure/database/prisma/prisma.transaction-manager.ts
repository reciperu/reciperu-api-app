import { Injectable } from '@nestjs/common';
import { ITransactionManager } from 'src/domain';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(private prismaService: PrismaService) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await this.prismaService.$transaction(async (transaction) => {
      let result;
      // this.prismaService.setClient(transaction);
      try {
        result = await callback();
        this.prismaService.$on('query', (e) => {
          console.log(e.query);
          console.log(e.params);
        });
      } catch (error) {
        throw error;
      } finally {
        // this.prismaService.setClient(this.prismaService.getClient());
      }
      return result;
    });
  }
}
