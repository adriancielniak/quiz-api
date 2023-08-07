import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Answer } from 'src/answer/entities/answer.entity';
import { checkQuestionInput } from 'src/question/dto/create-question.input';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';
import { DataSource, Repository } from 'typeorm';
import { CreateQuizInput } from './dto/create-quiz.input';
import { Quiz } from './entities/quiz.entity';
import { QuizModule } from './quiz.module';
import { QuizService } from './quiz.service';

jest.mock('src/answer/answer.service')
jest.mock('src/question/question.service')

describe('QuizService', () => {
  let service: QuizService;
  let dataSource: DataSource;
  let quizRepository: Repository<Quiz>;
  let answerRepository: Repository<Answer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizService, QuestionService, AnswerService,
        {
          provide: getRepositoryToken(Quiz),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Answer),
          useClass: Repository
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn(() => ({
                connect: jest.fn(),
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                rollbackTransaction: jest.fn(),
                release: jest.fn(),
              })),
          },
        },
    ],
    }).compile();

    answerRepository = module.get<Repository<Answer>>(getRepositoryToken(Answer));
    service = module.get<QuizService>(QuizService);
    dataSource = module.get<DataSource>(DataSource);
    quizRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(dataSource).toBeDefined();
  });

  it('should be defined', () => {
    expect(quizRepository).toBeDefined();
  });

  describe('createQuiz' , () => {
    it('should create and return new quiz', async () => {
      
      const quiz_input: CreateQuizInput = {
        title: 'title',
        questions: []
      }

      const quiz_result: Quiz = {
        id: 1,
        title: 'title',
        questions: []
      }

      jest.spyOn(quizRepository, 'create').mockReturnValueOnce(quiz_result);

      jest.spyOn(quizRepository, 'save').mockResolvedValueOnce(quiz_result);

      const result = await service.createQuiz(quiz_input);

      expect(result).toEqual(quiz_result);
    })
  })

  describe('checkAnswers1', () => {
    const first_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: [1],
      textAnswer: null
    }

    const second_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: [2],
      textAnswer: null
    }

    const question: Question = {
      id: 1,
      question_content: 'Who was played with 7?',
      question_type: 'TYPE_1',
      quiz: null,
      answers: [
            { id: 1, answer_content: 'Cristiano Ronaldo', question: null, is_correct: true },
            { id: 2, answer_content: 'Lionel Messi', question: null, is_correct: false },
            { id: 3, answer_content: 'Robert Lewandowski', question: null, is_correct: false },
            { id: 4, answer_content: 'Wojciech Szczesny', question: null, is_correct: false },
      ] 
    }

    const correct_answer: Answer = {
      id: 1, answer_content: 'Cristiano Ronaldo', question: null, is_correct: true 
    }

    it('should return true, question type 1', async () => {
      jest.spyOn(answerRepository, 'find').mockResolvedValueOnce([correct_answer])
      const result = await service.checkType1(first_student_answer, question);

      expect(result).toBe(true);
    })

    it('should return false, question type 1', async () => {
      jest.spyOn(answerRepository, 'find').mockResolvedValueOnce([correct_answer])
      const result = await service.checkType1(second_student_answer, question);

      expect(result).toBe(false);
    })
  })

  describe('checkAnswers2', () => {
    const first_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: [1, 4],
      textAnswer: null
    }

    const second_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: [1, 2],
      textAnswer: null
    }

    const question: Question = {
      id: 1,
      question_content: 'Who was played with 7?',
      question_type: 'TYPE_2',
      quiz: null,
      answers: [
            { id: 1, answer_content: 'Cristiano Ronaldo', question: null, is_correct: true },
            { id: 2, answer_content: 'Lionel Messi', question: null, is_correct: false },
            { id: 3, answer_content: 'Robert Lewandowski', question: null, is_correct: false },
            { id: 4, answer_content: 'Kylian Mbappe', question: null, is_correct: true },
      ] 
    }

    //const correct_answer_ids = [1, 4]

    it('should return true, question type 2', async () => {
      const result = await service.checkType2(first_student_answer, question);

      expect(result).toBe(true);
    })

    it('should return true, question type 2', async () => {
      const result = await service.checkType2(second_student_answer, question);

      expect(result).toBe(false);
    })
  })

  describe('checkAnswers3', () => {
    const first_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: [4, 2, 1, 3],
      textAnswer: null
    }

    const second_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: [2, 1, 3, 4],
      textAnswer: null
    }

    //const correct_order = [4, 2, 1, 3]

    const question: Question = {
      id: 1,
      question_content: 'Put the players from youngest to oldest?',
      question_type: 'TYPE_3',
      quiz: null,
      answers: [
            { id: 1, answer_content: 'Cristiano Ronaldo', question: null, priority: 3},
            { id: 2, answer_content: 'Lionel Messi', question: null, priority: 2 },
            { id: 3, answer_content: 'Zbigniew Boniek', question: null, priority: 4 },
            { id: 4, answer_content: 'Kylian Mbappe', question: null, priority: 1 },
      ] 
    }

    it('should return true, question type 3', async () => {
      const result = await service.checkType3(first_student_answer, question);
      expect(result).toBe(true);
    })

    it('should return false, question type 3', async () => {
      const result = await service.checkType3(second_student_answer, question);
      expect(result).toBe(false);
    })
  })

  describe('checkAnswers4', () => {
    const first_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: null,
      textAnswer: 'France'
    }

    const second_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: null,
      textAnswer: 'Germany'
    }

    const third_student_answer: checkQuestionInput = {
      question_id: 1,
      answer_ids: null,
      textAnswer: 'france'
    }

    const question: Question = {
      id: 1,
      question_content: 'Who won 2018 fifa world cup?',
      question_type: 'TYPE_4',
      quiz: null,
      answers: [
            { id: 1, answer_content: 'France', question: null},
      ] 
    }

    it('should return true, question type 4', async () => {
      const result = await service.checkType4(first_student_answer, question);
      expect(result).toBe(true);
    })

    it('should return false, question type 4', async () => {
      const result = await service.checkType4(second_student_answer, question);
      expect(result).toBe(false);
    })

    it('should return true, question type 4', async () => {
      const result = await service.checkType4(third_student_answer, question);
      expect(result).toBe(true);
    })
  })
});
