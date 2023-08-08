import { forwardRef, Module, ValidationPipe } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from 'src/answer/answer.module';
import { AnswerService } from 'src/answer/answer.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), forwardRef(() => AnswerModule)],
  providers: [QuestionResolver, QuestionService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }],
  exports: [QuestionService]
})
export class QuestionModule {}
