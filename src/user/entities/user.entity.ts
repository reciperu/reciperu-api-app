// import { ApiProperty } from '@nestjs/swagger';
// import { Exclude } from 'class-transformer';
// import { User, SpaceRole } from '@prisma/client';

// export class UserEntity implements User {
//   constructor(partial: Partial<UserEntity>) {
//     Object.assign(this, partial);
//   }
//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   uuid: string;

//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   spaceRole: SpaceRole;

//   @ApiProperty()
//   imageUrl: string;

//   @Exclude()
//   uid: string;

//   @ApiProperty()
//   createdAt: Date;

//   @Exclude()
//   updatedAt: Date;

//   @Exclude()
//   spaceId: number | null;
// }
