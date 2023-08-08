import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  answer_content: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  priority?: number

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean
}
