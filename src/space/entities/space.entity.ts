// import { ApiProperty } from '@nestjs/swagger';
// import { Space } from '@prisma/client';
// import { UserEntity } from 'src/user/entities/user.entity';

// export class SpaceEntity implements Space {
//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   uuid: string;

//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   password: string;

//   @ApiProperty()
//   createdAt: Date;

//   @ApiProperty({ required: false, type: UserEntity })
//   users?: UserEntity[];

//   constructor({ users, ...partial }: Partial<SpaceEntity>) {
//     Object.assign(this, partial);
//     if (users) {
//       console.log(users);
//       this.users = users.map((user) => new UserEntity(user));
//     }
//   }
// }
