import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';

@Resolver(() => Quiz)
export class QuizResolver {
  
}
