import { Test, TestingModule } from '@nestjs/testing';
import { checkQuestionInput } from 'src/question/dto/create-question.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { Quiz, QuizResult } from './entities/quiz.entity';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';

const firstQuiz: Quiz = {
    id: 1,
    title: 'example quiz',
    questions:[
    {
      id: 1,
      quiz: null, 
      question_type: 'TYPE_1',
      question_content: 'What is the capital of France?',
      answers: [
        { id: 1, answer_content: 'London', question: null, is_correct: false },
        { id: 2, answer_content: 'Paris', question: null, is_correct: true },
        { id: 3, answer_content: 'Berlin', question: null, is_correct: false },
        { id: 4, answer_content: 'Rome', question: null, is_correct: false },
      ],
    },
    {
      id: 2,
      quiz: null,
      question_type: 'TYPE_4',
      question_content: 'Who wrote the play "Romeo and Juliet"?',
      answers: [], 
    }
    ]
}

const secondQuiz: Quiz = {
  id: 2,
  title: 'example quiz 2',
  questions:[
  {
    id: 3,
    quiz: null, 
    question_type: 'TYPE_1',
    question_content: 'Who won the 2016 euro cup',
    answers: [
      { id: 5, answer_content: 'France', question: null, is_correct: false },
      { id: 6, answer_content: 'Poland', question: null, is_correct: false },
      { id: 7, answer_content: 'Portugal', question: null, is_correct: true },
      { id: 8, answer_content: 'Italy', question: null, is_correct: false },
    ],
  },
  {
    id: 4,
    quiz: null,
    question_type: 'TYPE_2',
    question_content: 'Which colours the rainbow consists of?',
    answers: [
      { id: 9, answer_content: 'red', question: null, is_correct: true },
      { id: 10, answer_content: 'orange', question: null, is_correct: true },
      { id: 11, answer_content: 'black', question: null, is_correct: false }
    ], 
  }
  ]
}

const quizzes = [firstQuiz, secondQuiz]

const quizInput: CreateQuizInput = {
    title: 'example quiz',
    questions:[
    {
      question_type: 'TYPE_1',
      question_content: 'What is the capital of France?',
      answers: [
        {  answer_content: 'London', is_correct: false },
        {  answer_content: 'Paris', is_correct: true },
        {  answer_content: 'Berlin', is_correct: false },
        {  answer_content: 'Rome', is_correct: false },
      ],
    },
    {
      question_type: 'TYPE_4',
      question_content: 'Who wrote the play "Romeo and Juliet"?',
      answers: [], 
    }
    ]
}

describe('QuizResolver', () => {
  let resolver: QuizResolver;
  let service: QuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizResolver,{
        provide:  QuizService,
        useValue: {
          createQuiz: jest.fn(),
          findAllQuizzes: jest.fn(),
          findQuiz: jest.fn(),
          checkAnswers: jest.fn()
        }
      }],
    }).compile();

    service = module.get<QuizService>(QuizService);
    resolver = module.get<QuizResolver>(QuizResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createQuiz', () => {
    it('should create and return new quiz with questions and answers', async () =>{
      jest.spyOn(service, 'createQuiz').mockResolvedValue(firstQuiz)

      const result = await resolver.createQuiz(quizInput);
      expect(result).toEqual(firstQuiz);
    })
  })

  describe('findAllQuizzes', () => {
    it('should return all the quizes', async () =>{
      jest.spyOn(service, 'findAllQuizzes').mockResolvedValue(quizzes);

      const result = await resolver.findAllQuizzes();
      expect(result).toEqual(quizzes)
    })
  })

  describe('findQuiz', () => {
    it('should return quiz which have provided id', async () =>{
      jest.spyOn(service, 'findQuiz').mockResolvedValue(firstQuiz);

      const result = await resolver.findQuiz(1);
      expect(result).toEqual(firstQuiz)
    })
  })

  const quizResult: QuizResult = {
    quiz_id: 1,
    questions: [
      {
        question_id: 1,
        question_content: 'Which country won the 2018 FIFA World Cup?',
        question_type: 'TYPE_1',
        student_answer_ids: [1],
        correct_answer_ids: [1],
        student_text_answer: null, 
        correct_text_answer: null,
      },
      {
        question_id: 2,
        question_content: 'Who won the Ballon dOr in 2021?',
        question_type: 'TYPE_1',
        student_answer_ids: [5],
        correct_answer_ids: [5],
        student_text_answer: null, 
        correct_text_answer: null,
      }
    ],
    result: 2,
    maxResult: 2,
    perecentage_points: 100,
  }

  const student_answer: checkQuestionInput [] = [
    {
      question_id: 1,
      answer_ids: [1],
      textAnswer: null
    },
    {
      question_id: 2,
      answer_ids: [5],
      textAnswer: null
    }
  ]

  describe('checkAnswers', () => {
    it('should return result for specific quiz and gained points' , async () => {
      jest.spyOn(service, 'checkAnswers').mockResolvedValue(quizResult)

      const result = await resolver.checkAnswers(1, student_answer);
      expect(result).toEqual(quizResult);
    })
  })
});
