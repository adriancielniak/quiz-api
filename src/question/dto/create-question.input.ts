import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';
import { IsNotEmpty, IsString, ValidateNested, ArrayNotEmpty, IsOptional, IsArray, IsInt, IsIn} from 'class-validator';
import { Type } from 'class-transformer';

const question_types = ['TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4'];

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsIn(question_types, { message: "only type 1/2/3/4" })
  question_type: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  question_content: string

  @Field(() => [CreateAnswerInput])
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerInput)
  answers: CreateAnswerInput[];
}

@InputType()
export class checkQuestionInput{
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  question_id: number;

  @Field(() => [Int], {nullable: true})
  @IsOptional()
  @IsArray()
  answer_ids?: number [];

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  textAnswer?: string;
}
