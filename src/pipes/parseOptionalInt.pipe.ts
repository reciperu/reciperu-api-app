import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe
  implements PipeTransform<string, number | undefined>
{
  transform(value: string): number | undefined {
    if (value === '') {
      return undefined;
    }
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }
    return val;
  }
}
