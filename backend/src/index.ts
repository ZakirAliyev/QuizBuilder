import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
