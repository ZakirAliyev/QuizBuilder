import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './QuizzesListPage.module.scss';

const QuizzesListPage = () => {
    const [quizzes, setQuizzes] = useState([]);

    const fetchQuizzes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/quizzes');
            setQuizzes(res.data);
        } catch (err) {
            console.error('Error fetching quizzes', err);
        }
    };

    const deleteQuiz = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/quizzes/${id}`);
            setQuizzes((prev) => prev.filter((q) => q.id !== id));
        } catch (err) {
            alert('Xəta baş verdi!');
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bütün Quizlər</h1>
            <Link to="/create" className={styles.createLink}>➕ Yeni Quiz</Link>

            <ul className={styles.quizList}>
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className={styles.quizItem}>
                        <div className={styles.quizInfo}>
                            <strong>{quiz.title}</strong> ({quiz.questionCount} sual)
                        </div>
                        <div className={styles.actions}>
                            <Link to={`/quizzes/${quiz.id}`} className={styles.viewLink}>📄 Bax</Link>
                            <button className={styles.deleteBtn} onClick={() => deleteQuiz(quiz.id)}>🗑️ Sil</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizzesListPage;
