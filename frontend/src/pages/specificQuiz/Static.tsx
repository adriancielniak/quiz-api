import { gql } from 'apollo-boost';

const FIND_FULL_QUESTIONS = gql`
query FindFullQuestions($quiz_id: Int!) {
  findFullQuestions(quiz_id: $quiz_id) {
    id
    question_type
    question_content
    answers {
      id
      answer_content
      priority
    }
  }
}
`;

const CHECK_ANSWERS = gql`
query CheckAnswers($quizId: Int!, $answers: [checkQuestionInput!]!) {
  checkAnswers(quiz_id: $quizId, student_answers: $answers) {
    quiz_id
    questions {
      question_id
      question_content
      question_type
      correct_answer_ids
      correct_text_answer
    }
    result
    maxResult 
  }
}
`;

export { FIND_FULL_QUESTIONS, CHECK_ANSWERS };