import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb+srv://mirceanotadmin:qXIed5J0EXj0bcvF@myfirstcluster-hqjfp.mongodb.net/nest-todoapp?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
