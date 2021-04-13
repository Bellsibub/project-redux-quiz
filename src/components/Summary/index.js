import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { quiz } from 'reducers/quiz';

// import { useSelector, useDispatch } from 'react-redux';
// import { quiz } from 'reducers/quiz';

/**
 * Contains:
 * Summary title
 * Results
 * restart button
 *
 */
export const Summary = () => {
  const answers = useSelector((state) => state.quiz.answers);
  const maxQuestions = useSelector((state) => state.quiz.questions.length);
  const [correctAnswer, setCorrectAnswer] = useState([]);

  const getCorrectAnswers = () => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect)
    setCorrectAnswer(correctAnswers);
  };

  useEffect(() => {
    getCorrectAnswers();
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="section-title">Summary</h2>
      <p>
        CORRECT ANSWERS:
        {correctAnswer.length} / {maxQuestions}
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
