import { useState } from 'react';
import axios from 'axios';
import styles from './CreateQuizPage.module.scss';
import { Link } from 'react-router-dom';

const CreateQuizPage = () => {
    const [form, setForm] = useState({
        title: '',
        questions: [],
    });

    const addQuestion = () => {
        setForm((prev) => ({
            ...prev,
            questions: [...prev.questions, { text: '', type: 'input', options: [] }],
        }));
    };

    const updateQuestion = (index, field, value) => {
        const updated = [...form.questions];
        updated[index][field] = value;
        setForm({ ...form, questions: updated });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/quizzes', form);
            alert('Quiz yaradıldı!');
            setForm({ title: '', questions: [] });
        } catch (err) {
            console.error(err);
            alert('Xəta baş verdi!');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Yeni Quiz</h1>
            <Link to="/quizzes" className={styles.link}>⬅️ Quiz siyahısına qayıt</Link>

            <input
                type="text"
                className={styles.input}
                placeholder="Quiz başlığı"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            {form.questions.map((q, idx) => (
                <div key={idx} className={styles.questionCard}>
                    <label>Sual {idx + 1}</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Sual mətnini yaz"
                        value={q.text}
                        onChange={(e) => updateQuestion(idx, 'text', e.target.value)}
                    />

                    <select
                        className={styles.select}
                        value={q.type}
                        onChange={(e) => updateQuestion(idx, 'type', e.target.value)}
                    >
                        <option value="input">Input</option>
                        <option value="boolean">Boolean</option>
                        <option value="checkbox">Checkbox</option>
                    </select>

                    {q.type === 'checkbox' && (
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Variantlar (vergüllə ayrılmış)"
                            value={(q.options || []).join(', ')}
                            onChange={(e) =>
                                updateQuestion(idx, 'options', e.target.value.split(',').map((o) => o.trim()))
                            }
                        />
                    )}
                </div>
            ))}

            <div className={styles.buttonGroup}>
                <button onClick={addQuestion} className={styles.secondaryButton}>➕ Sual əlavə et</button>
                <button onClick={handleSubmit} className={styles.primaryButton}>✅ Quiz Yarat</button>
            </div>
        </div>
    );
};

export default CreateQuizPage;
