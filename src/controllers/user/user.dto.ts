import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ActiveStatus, UpdateUserDto as DomainUpdateUserDto } from 'src/domain';
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
