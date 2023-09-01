import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
