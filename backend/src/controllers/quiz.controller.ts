import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE a new quiz
export const createQuiz = async (req: Request, res: Response) => {
    try {
        const { title, questions } = req.body;

        if (!title || !Array.isArray(questions)) {
            return res.status(400).json({ error: 'Title and questions are required' });
        }

        const quiz = await prisma.quiz.create({
            data: {
                title,
                questions: {
                    create: questions.map((q: any) => ({
                        type: q.type,
                        text: q.text,
                        options: q.options ? JSON.stringify(q.options) : null,
                    })),
                },
            },
            include: { questions: true },
        });

        return res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        return res.status(500).json({ error: 'Something went wrong while creating quiz.' });
    }
};

// GET all quizzes
export const getAllQuizzes = async (_req: Request, res: Response) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            include: { questions: true },
        });

        const result = quizzes.map((quiz) => ({
            id: quiz.id,
            title: quiz.title,
            questionCount: quiz.questions.length,
        }));

        return res.json(result);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return res.status(500).json({ error: 'Error fetching quizzes' });
    }
};

// GET a single quiz by ID
export const getQuizById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quizId = Number(id);

        if (isNaN(quizId)) {
            return res.status(400).json({ error: 'Invalid quiz ID' });
        }

        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: { questions: true },
        });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const parsedQuiz = {
            ...quiz,
            questions: quiz.questions.map((q) => ({
                ...q,
                options: q.options ? JSON.parse(q.options) : null,
            })),
        };

        return res.json(parsedQuiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return res.status(500).json({ error: 'Error fetching quiz' });
    }
};

// DELETE a quiz by ID
export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quizId = Number(id);

        if (isNaN(quizId)) {
            return res.status(400).json({ error: 'Invalid quiz ID' });
        }

        await prisma.question.deleteMany({
            where: { quizId },
        });

        await prisma.quiz.delete({
            where: { id: quizId },
        });

        return res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return res.status(500).json({ error: 'Error deleting quiz' });
    }
};
