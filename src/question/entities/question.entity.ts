import { ObjectType, Field, Int } from '@nestjs/graphql';
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
    @Column({type: "character", length: 1 , nullable: false})
    question_type: string

    @Field(() => String)
    @Column({type: "varchar", nullable: false})
    question_content: string

    @Field(() => [Answer!])
    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]
}
