import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { quiz } from 'reducers/quiz';

import './style.css';

export const CurrentQuestion = () => {
  const [answerIndex, setAnswerIndex] = useState();
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const currentQ = useSelector((state) => state.quiz.currentQuestionIndex);
  const maxQuestions = useSelector((state) => state.quiz.questions.length);
  const answers = useSelector((state) => state.quiz.answers);
  const [isSubmitted, setSubmitted] = useState();

  const dispatch = useDispatch();

  const checkAnswer = () => {
    if (answers[currentQ]) {
      if (answers[currentQ].isCorrect) {
        return <p>That is correct!</p>;
      } else {
        return <p>That was the wrong answer</p>;
      }
    } else {
      return null;
    }
  };
  const handleChange = (i) => {
    setAnswerIndex(i);
  };
  const handleSubmit = () => {
    dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex }));
    setSubmitted(true);
  };
  const handleGoToNext = () => {
    setSubmitted(false);
    dispatch(quiz.actions.goToNextQuestion());
  };

  if (!question) {
    return (
      <h2 className="section-title">Oh no! I could not find the current question!</h2>
    );
  }

  return (
    <div className="wrapper-question">
      <p className="progress">
        Question {question.id} of {maxQuestions}
      </p>
      <h2 className="section-title">{question.questionText}</h2>
      <ul className="answers">
        {question.options.map((option, index) => (
          <li key={option}>
            <input
              className="input-radio"
              type="radio"
              id={option}
              name="options"
              value={option}
              onChange={() => handleChange(index)} />
            <label className="input-label" htmlFor={option}>
              {option}
            </label>
          </li>
        ))}
      </ul>
      {checkAnswer()}
      <button
        type="button"
        className="round-button"
        onClick={isSubmitted ? handleGoToNext : handleSubmit}>
        {isSubmitted ? 'Next' : 'Submit'}
      </button>
    </div>
  );
};
