import { Test, TestingModule } from '@nestjs/testing';
import { Question } from './entities/question.entity';
import { QuestionModule } from './question.module';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';

const questionsTemplate: Question [] = [
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

describe('QuestionResolver', () => {
  let resolver: QuestionResolver;
  let questionService: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionResolver,
        {
        provide: QuestionService,
        useValue:{
          getAllQuestions: jest.fn(),
          findQuizQuestions: jest.fn(),
          findFullQuestions: jest.fn()
        }
      }]
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Should be defined', () => {
    expect(questionService).toBeDefined();
  });

  describe('getAllQuestions', () => {
    it('should return array of questions', async () =>{
      jest.spyOn(questionService, 'getAllQuestions').mockResolvedValue(questionsTemplate);

      const result = await resolver.getAllQuestions();
      expect(result).toEqual(questionsTemplate);
    })
  })

  describe('findQuizQuestions', () =>{
    it('should return array of questions for specific quiz', async () =>{
      jest.spyOn(questionService, 'findQuizQuestions').mockResolvedValue(questionsTemplate);

      const result = await resolver.findQuizQuestions(1);
      expect(result).toEqual(questionsTemplate);
    })
  })

  describe('findFullQuestions', () => {
    it('should return full information about questions', async () =>{
      jest.spyOn(questionService, 'findFullQuestions').mockResolvedValue(questionsTemplate);

      const result = await resolver.findFullQuestions(1);
      expect(result).toEqual(questionsTemplate);
    })
  })
});
