import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_QUIZZES = gql`
  query {
    findAllQuizzes {
      id
      title
    }
  }
`;

function StudentPage() {
  const { loading, error, data } = useQuery(GET_QUIZZES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center w-full max-w-screen-lg">
        {data.findAllQuizzes.map((quiz: any) => (
          <Link key={quiz.id} to={`/quiz/${quiz.id}`} className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-lg transition duration-300"
              style={{ width: '300px' }} 
            >
              {quiz.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudentPage;





