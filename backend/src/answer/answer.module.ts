import { forwardRef, Module, ValidationPipe } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionModule } from 'src/question/question.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), forwardRef(() => QuestionModule)],
  providers: [ AnswerService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
  exports: [AnswerService]
})
export class AnswerModule {}
