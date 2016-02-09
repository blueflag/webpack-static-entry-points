import {Map, List, fromJS} from 'immutable';
import {markdown} from "markdown";

const initialState = fromJS([]);

export default function (str) {
    return fromJS(markdown.parse(str))
        .skip(1)
        .reduce((reduction, value, key, iterable) => {

            switch (value.get(0)) {
                case 'header':
                    return reduction
                        // Create an object for each header
                        .update(vv => vv.push(fromJS({
                            title: value.get(2),
                            questions: [],
                            markdown: []
                        })))

                        .updateIn([reduction.size, 'markdown'], List(), vv => vv.push(value))

                case 'numberlist':
                    return reduction
                        .updateIn([reduction.size - 1 , 'markdown'], vv => vv.push('{{QUESTIONS}}'))
                        .setIn([reduction.size - 1 , 'questions'], value.skip(1).map(qq => qq.get(1)));

                default:
                    return reduction
                        .updateIn([reduction.size - 1 , 'markdown'], vv => vv.push(value));

            }
        }, initialState)
        .toJS()
}
