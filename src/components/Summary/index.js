import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  console.log(answers);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const getCorrectAnswers = () => {
    answers.map((answer) => {
      return answer.isCorrect && setCorrectAnswer(correctAnswer + 1);
    });
  };

  useEffect(() => {
    getCorrectAnswers();
  }, []);

  return (
    <div>
      <h1>Summary</h1>
      <p>{correctAnswer}</p>
    </div>
  );
};
