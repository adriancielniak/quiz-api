import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Question, QuestionResult } from 'src/question/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Quiz {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "varchar", nullable: false })
    title: string;

    @Field(() => [Question])
    @OneToMany(() => Question, (question) => question.quiz, { eager: true })
    questions: Question[];
}

@ObjectType()
export class QuizResult{
    @Field(() => Int)
    quiz_id: number;

    @Field(() => [QuestionResult])
    questions: QuestionResult[];

    @Field(() => Int)
    result: number;

    @Field(() => Int)
    maxResult: number;

    @Field(() => Int)
    perecentage_points: number;
}