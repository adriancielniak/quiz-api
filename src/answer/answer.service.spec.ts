import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from 'src/question/entities/question.entity';
import { DataSource, Repository } from 'typeorm';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

const question: Question = {
  id: 1,
  question_content: 'content',
  question_type: 'TYPE_3',
  quiz: null,
  answers: []
}

describe('AnswerService', () => {
  let service: AnswerService;
  let answerRepository: Repository<Answer>;
  let dataSource: DataSource;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService, {
        provide: getRepositoryToken(Answer),
        useClass: Repository
      },
      {
        provide: getRepositoryToken(Question),
        useClass: Repository
      },
      {
        provide: DataSource,
        useValue: {
          createQueryRunner: jest.fn(() => ({
            manager: {
              findOne: jest.fn().mockResolvedValue(question),
           },
            connect: jest.fn(),
            startTransaction: jest.fn(),
            commitTransaction: jest.fn(),
            rollbackTransaction: jest.fn(),
            release: jest.fn(),
          })),
        },
      }]
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
    service = module.get<AnswerService>(AnswerService)
    answerRepository = module.get<Repository<Answer>>(getRepositoryToken(Answer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAnswer', () => {
    it('should create and return new answer', async () => {

      const question_id = 1;

      const answer_input = {
        answer_content: "content",
        priority: 1,
        is_correct: null 
      }

      const answer_result: Answer = {
        id: expect.any(Number),
        answer_content: "content",
        priority: 1,
        is_correct: null,
        question: null
      } 

      jest.spyOn(answerRepository, 'create').mockReturnValue(answer_result);
  
      //jest.spyOn(customQueryRunner.manager.findOne, 'findOne').mockReturnValue(question);

      const result = await service.createAnswer(question_id, answer_input);

      expect(result).toEqual(answer_result);
    });
  });

  
  describe('getAnswers', () => {
    const firstAnswer = {
      id: expect.any(Number),
      answer_content: "content",
      priority: 1,
      is_correct: null,
      question: {
        id: 1,
        quiz: undefined,
        answers: [],
        question_type: '',
        question_content: '',
      }
    }
    
    it('should return one answer', async () =>{
      jest.spyOn(answerRepository, 'find').mockResolvedValueOnce([firstAnswer])

      const result = await service.getAnswers(1)

      expect(result).toEqual(expect.arrayContaining([firstAnswer]))
    })

    const secondAnswer = {
      id: expect.any(Number),
      answer_content: "content 2",
      priority: null,
      is_correct: true,
      question: null
    }

    it('should return two answers', async () => {

      jest.spyOn(answerRepository, 'find').mockResolvedValueOnce([firstAnswer, secondAnswer])

      expect(await service.getAnswers(1)).toEqual(expect.arrayContaining([firstAnswer, secondAnswer]))
    })
  })
  
});
