import { forwardRef, Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { Quiz } from './entities/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), forwardRef(() => QuestionModule)],
  providers: [QuizResolver, QuizService]
})
export class QuizModule {}
