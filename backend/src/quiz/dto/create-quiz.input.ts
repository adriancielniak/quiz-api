import { InputType, Field } from '@nestjs/graphql';
import { CreateQuestionInput } from 'src/question/dto/create-question.input';
import { IsNotEmpty, IsString, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateQuizInput {
  @Field(() => String)
  @IsNotEmpty({ message: "Title cannot be empty" })
  @IsString({ message: "Title must be a string" })
  title: string

  @Field(() => [CreateQuestionInput])
  @ArrayNotEmpty({ message: "At least one question is required" })
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionInput)
  questions: CreateQuestionInput[];
}