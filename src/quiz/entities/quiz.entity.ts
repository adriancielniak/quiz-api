import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Quiz {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: "varchar", nullable: false })
    title: string

    @Field(() => [Question!])
    @OneToMany(() => Question, (question) => question.quiz)
    questions: Question[]
}
