import { Logger, Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // TODO : Change this for Production
      }),
    }),
    TodoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger('App Module');

  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      const databaseName = this.configService.getOrThrow('DB_DATABASE');
      this.logger.log(
        `DATABASE is connected to PostgreSQL with DATABASE NAME : ${databaseName}`,
      );
    } else {
      this.logger.log('❌ There is a error while connecting to the database');
    }
  }
}
