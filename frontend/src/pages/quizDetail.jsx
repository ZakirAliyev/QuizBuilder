import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './QuizDetailPage.module.scss';

const QuizDetailPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchQuiz = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/quizzes/${id}`);
            setQuiz(res.data);
        } catch (err) {
            console.error('Error fetching quiz:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    if (loading) return <p>Yüklənir...</p>;
    if (!quiz) return <p>Quiz tapılmadı.</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{quiz.title}</h1>
            <Link to="/quizzes" className={styles.link}>⬅️ Geri qayıt</Link>
            <hr />
            <div className={styles.questions}>
                {quiz.questions.map((q, idx) => (
                    <div key={q.id} className={styles.questionCard}>
                        <p className={styles.question}>
                            <strong>{idx + 1}.</strong> {q.text}
                            <em className={styles.type}>({q.type})</em>
                        </p>

                        {q.type === 'checkbox' && q.options && (
                            <ul className={styles.options}>
                                {q.options.map((opt, i) => (
                                    <li key={i}>• {opt}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizDetailPage;
