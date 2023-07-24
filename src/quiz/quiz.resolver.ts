import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { Question } from 'src/question/entities/question.entity';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(
        private readonly quizService: QuizService
        ) {}

    @Mutation(() => Quiz)
    createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput){
        return this.quizService.createQuiz(createQuizInput)
    }

    @Query(() => [Quiz], { name: 'findAllQuizzes' })
        async findAllQuizzes() {
            return this.quizService.getAllQuizzes();
    }

    @Query(() => Quiz, { name: 'findQuiz' })
        async findQuiz(@Args('quiz_id', { type: () => Int }) quiz_id: number) {
            return this.quizService.findQuiz(quiz_id);
  }
}
