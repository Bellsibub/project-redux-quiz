import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { quiz } from 'reducers/quiz';
import './style.css';

export const Summary = () => {
  const answers = useSelector((state) => state.quiz.answers);
  const maxQuestions = useSelector((state) => state.quiz.questions.length);
  const [correctAnswer, setCorrectAnswer] = useState([]);

  const getCorrectAnswers = () => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect);
    setCorrectAnswer(correctAnswers);
  };

  useEffect(() => {
    getCorrectAnswers();
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="section-title">Summary</h2>
      <p className="results">
        You got {correctAnswer.length} out of {maxQuestions} questions right
      </p>
      <button
        type="submit"
        className="round-button"
        onClick={() => dispatch(quiz.actions.restart())}>
        Restart
      </button>
    </div>
  );
};
