import React, { useState } from 'react';

function StudentPage() {
  // Dane przykładowych quizów
  const quizzes = [
    { id: 1, title: 'Quiz 1' },
    { id: 2, title: 'Quiz 2' },
    { id: 3, title: 'Quiz 3' },
    // Tutaj możesz dodać więcej quizów
  ];

  // Funkcja do generowania losowego koloru w formacie RGB
  const getRandomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + color;
  };

  // Stan przechowujący aktualnie wybrany quiz
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {/* Renderowanie przycisków dla każdego quizu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center w-full max-w-screen-lg">
        {quizzes.map(quiz => (
          <button
            key={quiz.id}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition duration-300 flex items-center justify-center"
            style={{ backgroundColor: getRandomColor() }}
          >
            {quiz.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StudentPage;
