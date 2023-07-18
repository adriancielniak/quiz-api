import { InputType, Field } from '@nestjs/graphql';
import { CreateQuestionInput } from 'src/question/dto/create-question.input';

@InputType()
export class CreateQuizInput {
  @Field(() => String)
  title: string

  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];
}