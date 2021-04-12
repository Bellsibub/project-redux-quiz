import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';

/**
 * Contains:
 * Question title
 * Question answers (radio)
 * NextQ button
 * Progress bar (question x / y)
 *
 */

export const CurrentQuestion = () => {
  const [answerIndex, setAnswerIndex] = useState();
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const maxQuestions = useSelector(
    (state) => state.quiz.questions.length
  )

  const dispatch = useDispatch();

  const handleChange = (i) => {
    setAnswerIndex(i);
  };
  const handleSubmit = () => {
    dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex }))
    dispatch(quiz.actions.goToNextQuestion())
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      <ul>
        {question.options.map((option, index) => (
          <li key={option}>
            <input
              type="radio"
              id={option}
              name="options"
              value={option}
              onChange={() => handleChange(index)} />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleSubmit}>
        Next
      </button>
      <p>{question.id}/{maxQuestions}</p>
    </div>
  );
};
