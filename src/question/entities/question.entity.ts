import { ObjectType, Field, Int} from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Question {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => Quiz)
    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz

    @Field(() => String)
    @Column({type: "varchar", nullable: false})
    question_type: string

    @Field(() => String)
    @Column({type: "varchar", nullable: false})
    question_content: string

    @Field(() => [Answer])
    @OneToMany(() => Answer, (answer) => answer.question, { eager: true })
    answers: Answer[]
}

@ObjectType()
export class QuestionResult{
    @Field(() => Int)
    question_id: number;

    @Field(() => String)
    question_content: string;

    @Field(() => String)
    question_type: string;

    @Field(() => [Int], {nullable: true})
    student_answer_ids?: number [];

    @Field(() => [Int], {nullable: true})
    correct_answer_ids?: number [];

    @Field(() => String, {nullable: true})
    student_text_answer?: string;

    @Field(() => String, {nullable: true})
    correct_text_answer?: string;
}
