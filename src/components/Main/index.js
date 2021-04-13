import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'

import { CurrentQuestion } from 'components/CurrentQuestion'
import { Summary } from 'components/Summary'

export const Main = () => {
  const quizOver = useSelector((state) => state.quiz.quizOver)

  return (
    <div className="blobs">
      <main>
        {quizOver ? <Summary /> : <CurrentQuestion />}
      </main>
    </div>
  );
};
