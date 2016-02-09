import {Map, List, fromJS} from 'immutable';
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var create = require('lodash/object/create');
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var yamlFront = require('yaml-front-matter');

var fileGlob = glob.sync('./static/*.md');


var fileList = List(fileGlob).map(filePath => {
    var fileRegex = filePath.match(/([^\/]+)(\.\w+$)/);
    var file = fs.readFileSync(path.resolve(filePath), 'utf8');
    return fromJS(yamlFront.loadFront(file))
        .set('filePath', filePath)
        .set('fileName', fileRegex[1])
        .set('fileExtension', fileRegex[2]);
});

var entryObject = fileList.reduce((reduction, value) => {
    return reduction.set(value.get('fileName'), './src/trc-quiz-maker/static/staticRender.js')
}, Map());


module.exports = function(config) {
    return create(config, {
        devtool: undefined,
        entry: entryObject.toJS(),
        cache: false,
        output: {
            path: 'dest',
            filename: '[name]/index.js',
            libraryTarget: 'umd'
        },
        plugins: fileList.map(ii => {
            return new StaticSiteGeneratorPlugin(ii.get('fileName'), [ii.get('fileName')], {boostrap: ii.toJS()})
        }).toJS()
    });
}
