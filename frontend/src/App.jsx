import { Routes, Route } from 'react-router-dom';
import CreateQuizPage from './pages/create';
import QuizzesListPage from './pages/quizzes';
import QuizDetailPage from './pages/quizDetail';

function App() {
    return (
        <Routes>
            <Route path="/" element={<QuizzesListPage />} />
            <Route path="/create" element={<CreateQuizPage />} />
            <Route path="/quizzes" element={<QuizzesListPage />} />
            <Route path="/quizzes/:id" element={<QuizDetailPage />} />
        </Routes>
    );
}

export default App;
