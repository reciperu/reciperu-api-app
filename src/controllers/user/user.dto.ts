import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import {
  ActiveStatus,
  UpdateUserDto as DomainUpdateUserDto,
  UpdateUserTokenDto as DomainUpdateUserTokenDto,
} from 'src/domain';
export class UpdateUserDto implements DomainUpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ enum: ActiveStatus })
  @IsString()
  @IsNotEmpty()
  activeStatus: ActiveStatus;
}

export class UpdateUserTokenDto implements DomainUpdateUserTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
