import { createSlice } from '@reduxjs/toolkit';

const questions = [
  {
    id: 1,
    questionText: 'Which Apollo mission was the first one to land on the Moon?',
    options: ['Apollo 11', 'Apollo 10', 'Apollo 9', 'Apollo 13'],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    questionText: 'If you planted the seeds of Quercus robur what would grow?',
    options: ['Flowers', 'Vegtables', 'Grains', 'Trees'],
    correctAnswerIndex: 3
  },
  {
    id: 3,
    questionText: 'Which gas forms about 78% of the Earth atmosphere?"',
    options: ['Nitrogen', 'Oxygen', 'Argon', 'Carbon Dioxide'],
    correctAnswerIndex: 0
  },
  {
    id: 4,
    questionText:
      'Which musical artist was NOT featured as playable avatars in the game DJ Hero?',
    options: ['DJ Shadow', 'Daft Punk', 'Dr. Dre', 'Grandmaster Flash'],
    correctAnswerIndex: 2
  },
  {
    id: 5,
    questionText: 'The first half-hour CGI cartoon, ReBoot, aired on which year?',
    options: ['1993', '1994', '1998', '1999'],
    correctAnswerIndex: 1
  }
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          'Could not find question! Check to make sure you are passing the question id correctly.'
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });
    },

    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    restart: () => {
      return initialState;
    }
  }
});
