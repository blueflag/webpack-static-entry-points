import React from 'react';
var md = require( "markdown" ).markdown


export default function Quiz(props) {
    // var questions = props.__content
    //     .split("#")
    //     .filter(ii => ii !== '\n')
    //     .map(ii => ii.replace(/./,'#'))

    console.log(md.parse(props.__content));
    return <div>Quiz</div>
}
