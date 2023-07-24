import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  question_type: string

  @Field(() => String)
  question_content: string

  @Field(() => [CreateAnswerInput])
  answers: CreateAnswerInput[];
}

@InputType()
export class checkQuestionInput{
  @Field(() => Int)
  question_id: number;

  @Field(() => Int, {nullable: true})
  answer_ids?: number [];

  @Field(() => String, {nullable: true})
  textAnswer?: string;
}
