import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz, QuizResult } from './entities/quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { Question, QuestionResult } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';
import { CreateQuizInput } from './dto/create-quiz.input';
import { checkQuestionInput } from 'src/question/dto/create-question.input';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly questionService: QuestionService,
        private dataSource: DataSource
      ) {}
    
    
    async createQuiz(createQuizInput: CreateQuizInput): Promise <Quiz>{
        const {title, questions} = createQuizInput;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try{
            const quiz = this.quizRepository.create({title});
            quiz.questions = []

            const savedQuiz = await queryRunner.manager.save(quiz)

            for(const question of questions){ 
                let questionToSave = await this.questionService.createQuestion(quiz, question, queryRunner);
                questionToSave = await queryRunner.manager.save(questionToSave)
                savedQuiz.questions.push(questionToSave)
            }
            
            await queryRunner.commitTransaction();

            return savedQuiz;
        }
        catch(err){
            await queryRunner.rollbackTransaction();
            throw new Error(err)
        }
        finally{
            await queryRunner.release();
        }
    }

    async checkType1(student_answer: checkQuestionInput, question: Question): Promise <boolean>{
        const correct_answer = question.answers.find((answer) => answer.is_correct);
        return !!correct_answer && correct_answer.id === student_answer.answer_ids[0];
    }

    async checkType2(student_answer: checkQuestionInput, question: Question): Promise <boolean>{
        const correct_answer_ids = question.answers.filter((answer) => answer.is_correct).map((answer) => answer.id);
        return (
            student_answer.answer_ids.length === correct_answer_ids.length &&
            student_answer.answer_ids.every((answer_id) => correct_answer_ids.includes(answer_id))
        );
    }

    async checkType3(student_answer: checkQuestionInput, question: Question): Promise <boolean>{
        const correct_answer_ids = question.answers.sort((first, second) => first.priority - second.priority).map((answer) => answer.id);
        return (
            student_answer.answer_ids.length === correct_answer_ids.length &&
            student_answer.answer_ids.every((answer_id, index) => answer_id === correct_answer_ids[index])
        );
    }

    async checkType4(student_answer: checkQuestionInput, question: Question): Promise <boolean>{
        const correct_text_answer = question.answers[0].answer_content;
        return student_answer.textAnswer.toLowerCase() === correct_text_answer.toLowerCase();
    }

    async checkAnswers(quiz_id: number, student_answers: checkQuestionInput []): Promise <QuizResult>{
        const quiz = await this.findQuiz(quiz_id);

        let total_questions = 0;
        let correct_answers = 0;

        if(quiz && quiz.questions){
            total_questions = quiz.questions.length;

            const questions_result: QuestionResult[] = [];


            for(const question of quiz.questions){
                const student_answer = student_answers.find((answer) => answer.question_id === question.id);

                const singleResult: QuestionResult = {
                    question_id: question.id,
                    question_type: question.question_type,
                    question_content: question.question_content
                }

                //jednokroetnego wyboru
                if(question.question_type === 'TYPE_1'){
                    singleResult.student_answer_ids = student_answer.answer_ids;
                    singleResult.correct_answer_ids = question.answers.filter((answer) => (answer.is_correct)).map((answer) => answer.id);

                    if(await this.checkType1(student_answer, question)){
                        correct_answers++;
                    }
                }
                //wieloktornego wyboru
                else if(question.question_type === 'TYPE_2'){
                    singleResult.student_answer_ids = student_answer.answer_ids;
                    singleResult.correct_answer_ids = question.answers.filter((answer) => (answer.is_correct)).map((answer) => answer.id);

                    if(await this.checkType2(student_answer, question)){
                        correct_answers++;
                    }
                }
                //sortowanie
                else if(question.question_type === 'TYPE_3'){
                    singleResult.student_answer_ids = student_answer.answer_ids;
                    singleResult.correct_answer_ids = question.answers.sort((first, second) => first.priority - second.priority).map((answer) => answer.id);

                    if(await this.checkType3(student_answer, question)){
                        correct_answers++;
                    }
                }
                //pisemna odpowiedz
                else if(question.question_type === 'TYPE_4'){
                    singleResult.student_text_answer = student_answer.textAnswer;
                    singleResult.correct_text_answer = question.answers[0].answer_content;

                    if(await this.checkType4(student_answer, question)){
                        correct_answers++;
                    }
                }

                questions_result.push(singleResult);
            }


            const percentage = Math.round((correct_answers / total_questions) * 100)

            const result: QuizResult = {
                quiz_id: quiz_id,
                questions: questions_result,
                result: correct_answers,
                maxResult: total_questions,
                perecentage_points: percentage
            }

            return result;

        }
        else{
            throw new Error('quiz not found or questions not found')
        }
    }


    async findQuiz(quiz_id: number): Promise<Quiz> {

        const quiz = await this.quizRepository
          .createQueryBuilder('quiz')
          .leftJoinAndSelect('quiz.questions', 'question')
          .leftJoinAndSelect('question.answers', 'answer')
          .where('quiz.id = :id', { id: quiz_id })
          .getOne();
      
        if (!quiz) {
          throw new Error('quiz not found');
        }
      
        return quiz;
    }

    async findAllQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }
}
