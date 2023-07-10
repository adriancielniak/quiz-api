import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Question)
    @ManyToOne(() => Question, (question) => question.answers)
    question: Question

    @Field(() => String)
    @Column({type: "varchar", nullable: false})
    answer_content: string

    @Field(() => Int)
    @Column({type: "int", nullable: true})
    priority: number

    @Field(() => Boolean)
    @Column({type: "boolean", nullable: true})
    is_correct: boolean
}
