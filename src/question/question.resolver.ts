import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';

@Resolver(() => Question)
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService) {}

    @Query(() => [Question], { name: 'findAllQuestions' })
    async findAllQuestions() {
    return this.questionService.getAllQuestions();
    }


    @Query(() => [Question], { name: "findQuizQuestions" })
        async findQuizQuestions(@Args('quiz_id', { type: () => Int }) quiz_id: number) {
        return this.questionService.findQuizQuestions(quiz_id);
}
}
