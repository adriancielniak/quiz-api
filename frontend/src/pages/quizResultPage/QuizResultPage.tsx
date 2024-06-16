import { Link, useLocation } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { Typography } from '@material-ui/core';

interface ResultQuestions {
  question_id: number;
  question_content: string;
  question_type: string;
  correct_answer_ids: number[];
  correct_text_answer: string;
  student_answer_ids: number[];
  student_text_answer: string;
}

interface Answer {
  id: number;
  answer_content: string;
  textAnswer: boolean;
}

interface Question {
  id: number;
  question_type: string;
  question_content: string;
  answers: Answer[];
}

interface Result {
  quiz_id: number;
  questions: ResultQuestions[];
  result: number;
  maxResult: number;
  answers: { findFullQuestions: Question[] };
}

const QuizResultPage = () => {
  const location = useLocation();
  const quizResult = location.state as Result;

  // Debugging output
  console.log("QuizResult: ", JSON.stringify(quizResult, null, 2));

  const getAnswerContent = (questionId: number, answerIds: number[]) => {
    const question = quizResult.answers.findFullQuestions.find(q => q.id === questionId);
    if (!question) return 'No answer found';

    return answerIds
      .map(answerId => {
        const answer = question.answers.find(a => a.id === answerId);
        return answer ? answer.answer_content : 'Unknown answer';
      })
      .join(', ');
  };

  const renderAnswer = (question: ResultQuestions) => {
    const isCorrect =
      question.question_type === 'TYPE_4'
        ? question.student_text_answer === question.correct_text_answer
        : question.question_type === 'TYPE_3'
        ? JSON.stringify(question.student_answer_ids) === JSON.stringify(question.correct_answer_ids)
        : JSON.stringify(question.student_answer_ids.sort()) === JSON.stringify(question.correct_answer_ids.sort());

    const borderColor = isCorrect ? 'border-green-500' : 'border-red-500';

    return (
      <li key={question.question_id} className={`border-2 p-4 mb-4 rounded ${borderColor}`}>
        <p>{question.question_content}</p>
        {question.question_type === 'TYPE_4' ? (
          <>
            <p>Student answer: {question.student_text_answer || 'No answer provided'}</p>
            <p>Correct answer: {question.correct_text_answer || 'No correct answer'}</p>
          </>
        ) : (
          <>
            <p>Student answer: {question.student_answer_ids.length ? getAnswerContent(question.question_id, question.student_answer_ids) : 'No answer provided'}</p>
            <p>Correct answer: {question.correct_answer_ids.length ? getAnswerContent(question.question_id, question.correct_answer_ids) : 'No correct answer'}</p>
          </>
        )}
      </li>
    );
  };

  // Validate quizResult structure
  if (!quizResult || !quizResult.answers || !Array.isArray(quizResult.answers.findFullQuestions) || !Array.isArray(quizResult.questions)) {
    return <div>Error: Invalid quiz result data.</div>;
  }

  return (
    <div className='max-w-xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md'>
      <Typography variant="h4" align="center" gutterBottom>Quiz Result</Typography>

      <Typography variant="h6" align="center" gutterBottom>
        Your result: {quizResult.result} / {quizResult.maxResult}
      </Typography>

      <div className="flex justify-center space-x-4 mt-4 mb-4">
        <ProgressBar value={quizResult.result} max={quizResult.maxResult} />
      </div>

      <ul>
        {quizResult.questions.map(question => renderAnswer(question))}
      </ul>

      <div className="flex justify-center space-x-4 mt-4 mb-4">
        <Link key={quizResult.quiz_id} to={`/quiz/${quizResult.quiz_id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          Try again
        </Link>

        <Link to={`/student`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          All Quizzes
        </Link>
      </div>
    </div>
  );
};

export default QuizResultPage;
