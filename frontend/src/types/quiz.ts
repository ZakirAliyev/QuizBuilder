export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
    text: string;
    type: QuestionType;
    options?: string[];
}

export interface QuizForm {
    title: string;
    questions: Question[];
}
