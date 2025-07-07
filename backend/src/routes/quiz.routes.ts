import express from 'express';
import * as quizController from '../controllers/quiz.controller';

const router = express.Router();

router.post('/', (req, res) => {
    quizController.createQuiz(req, res);
});

router.get('/', (req, res) => {
    quizController.getAllQuizzes(req, res);
});

router.get('/:id', (req, res) => {
    quizController.getQuizById(req, res);
});

router.delete('/:id', (req, res) => {
    quizController.deleteQuiz(req, res);
});

export default router;
