import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Profile],
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Profile]),
    UsersModule,
    ProfilesModule,
  ],
})
export class AppModule {}
