import React from 'react';

function renderStyles () {
    if(process.env.NODE_ENV === 'production') {
        return <link rel="stylesheet" href="/trc-quiz-maker.css"/>;
    }
}

export default (props) => {
    return (
        <html lang="">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <title>trc quiz maker</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
                {renderStyles()}
            </head>
            <body>
                <div id="app"></div>
                <script id="bootstrap" type="text/features" dangerouslySetInnerHTML={{__html: JSON.stringify(props.locals)}} />
                <script type="text/javascript" src="index.js"></script>
            </body>
        </html>
    );
}
