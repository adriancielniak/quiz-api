import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Question } from "./question";

Entity()
export class Answer{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question

    @Column({type: "varchar", nullable: false})
    answer_content: string

    @Column({type: "int", nullable: true})
    priority: number

    @Column({type: "boolean", nullable: true})
    is_correct: boolean
}