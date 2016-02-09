import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import StaticIndex from 'trc-quiz-maker/server/index.static.jsx';
import Quiz from 'trc-quiz-maker/client/components/Quiz';

if (typeof document !== 'undefined') {
    var props = JSON.parse(document.getElementById('bootstrap').text);
    ReactDOM.render(<Quiz {...props}/>, document.getElementById('app'));
}

module.exports = function render(locals, callback) {
    callback(null, '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(<StaticIndex locals={locals.boostrap}></StaticIndex>));
};
