import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Answer } from "./answer";
import { Quiz } from "./quiz";

Entity()
export class Question{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz

    @Column({type: "character", length: 1 , nullable: false})
    question_type: string

    @Column({type: "varchar", nullable: false})
    question_content: string

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[]
}