import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(message ? message : 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
