import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

interface Question {
  id: number;
  question_type: string;
  question_content: string;
}

const GET_QUESTIONS = gql`
  query GetQuestions($quizId: Int!) {
    findFullQuestions(quiz_id: $quizId) {
      id
      question_type
      question_content
    }
  }
`;

function QuizQuestionsPage() {
  const { quizId } = useParams<{ quizId?: string }>(); 
  const { loading, error, data } = useQuery(GET_QUESTIONS, {
    variables: { quizId: parseInt(quizId || "0") }, 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <h1>Questions for Quiz {quizId}</h1>
      <ul>
        {data.findFullQuestions.map((question: Question) => ( 
          <li key={question.id}>
            <p>{question.question_content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizQuestionsPage;

