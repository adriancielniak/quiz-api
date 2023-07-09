import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "./question";

@Entity()
export class Quiz{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: false })
    title: string

    @OneToMany(() => Question, (question) => question.quiz)
    questions: Question[]
}