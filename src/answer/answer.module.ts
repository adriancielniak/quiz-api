import { forwardRef, Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), forwardRef(() => QuestionModule)],
  providers: [AnswerResolver, AnswerService],
  exports: [AnswerService]
})
export class AnswerModule {}
