import React from 'react';
import parseQuiz from 'trc-quiz-maker/client/quiz/parseQuiz';

export default function Quiz(props) {

    // var questions = props.__content
    //     .split("#")
    //     .filter(ii => ii !== '\n')
    //     .map(ii => ii.replace(/./,'#'))

    console.log(parseQuiz(props.__content));
    return <div>Quiz</div>
}
