import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import type {
  UpdateSpaceDto as DomainUpdateSpaceDto,
  ValidateInvitationDto as DomainValidateInvitationDto,
} from 'src/domain';

export class UpdateSpaceDto implements DomainUpdateSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ValidateInvitationDto implements DomainValidateInvitationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
