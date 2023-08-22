import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';


describe('AnswerService', () => {
  let service: AnswerService;
  let answerRepository: Repository<Answer>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService, {
        provide: getRepositoryToken(Answer),
        useClass: Repository
      }]
    }).compile();

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

      jest.spyOn(answerRepository, 'save').mockResolvedValueOnce(answer_result);

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
