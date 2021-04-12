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
  console.log(answers);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const getCorrectAnswers = () => {
    answers.map((answer) => {
      return answer.isCorrect && setCorrectAnswer(correctAnswer + 1);
    });
  };

  useEffect(() => {
    getCorrectAnswers();
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Summary</h1>
      <p>
        {correctAnswer} / {maxQuestions}
      </p>
      <button type="submit" onClick={() => dispatch(quiz.actions.restart())}>Restart</button>
    </div>
  );
};
