import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  question_id: number

  @Field(() => String)
  answer_content: string

  @Field(() => Int, { nullable: true })
  priority?: number

  @Field(() => Boolean, { nullable: true })
  is_correct?: boolean
}
