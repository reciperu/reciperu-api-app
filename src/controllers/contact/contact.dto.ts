import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SendContactDto as DomainSendContactDto } from 'src/domain';

export class SendContactDto implements DomainSendContactDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
