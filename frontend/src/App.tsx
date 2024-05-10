import './App.css';
import HomePage from './pages/homePage/HomePage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentPage from './pages/studentPage/StudentPage';
import TeacherPage from './pages/teacherPage/TeacherPage';
import Navbar from './components/Navbar';
import QuizQuestionsPage from './pages/specificQuiz/specificQuiz';
import QuizResultPage from './pages/quizResultPage/QuizResultPage';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/quiz/:quizId" element={<QuizQuestionsPage />} /> 
            <Route path="/quizResult/:quizId" element={<QuizResultPage />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
