import {Map, List, fromJS} from 'immutable';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import create from 'lodash/object/create';
import fs from "fs";
import path from "path";
import glob from "glob";
import yamlFront from 'yaml-front-matter';


module.exports = function(config, globPattern, renderPath) {
    var fileGlob = glob.sync(globPattern);
    var fileList = List(fileGlob).map(filePath => {
        var fileRegex = filePath.match(/([^\/]+)(\.\w+$)/);
        var file = fs.readFileSync(path.resolve(filePath), 'utf8');
        return fromJS(yamlFront.loadFront(file))
            .set('filePath', filePath)
            .set('fileName', fileRegex[1])
            .set('fileExtension', fileRegex[2]);
    });

    var entryObject = fileList.reduce((reduction, value) => {
        return reduction.set(value.get('fileName'), renderPath)
    }, Map());

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
