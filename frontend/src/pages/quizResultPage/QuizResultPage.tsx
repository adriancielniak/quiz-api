import {useLocation} from 'react-router-dom';
import ProgressBar from './ProgressBar';

interface ResultQuestions {
  question_id: number;
  question_content: string;
  question_type: string;
  correct_answer_ids: number[];
  correct_text_answer: string;
}

interface Result {
  quiz_id: number;
  questions: ResultQuestions[];
  result: number;
  maxResult: number;
}

const QuizResultPage = () => {
  const location = useLocation();
  const quizResult = location.state as Result;

  return (
    <div>
      <h1>Quiz Result</h1>
      <p>Your result: {quizResult.result} / {quizResult.maxResult}</p>
      <ProgressBar value={quizResult.result} max={quizResult.maxResult} />
      <ul>
        {quizResult.questions.map(question => (
          <li key={question.question_id}>
            <p>{question.question_content}</p>
            <p>Correct answer: {question.correct_answer_ids ? question.correct_answer_ids.join(', ') : 'No correct answer'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizResultPage;

