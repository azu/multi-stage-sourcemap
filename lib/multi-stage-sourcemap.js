"use strict";
var sourceMap = require("source-map");
var path = require("path");
var Generator = sourceMap.SourceMapGenerator;
var Consumer = sourceMap.SourceMapConsumer;
function transfer(parameters) {
    var fromSourceMap = parameters.fromSourceMap;
    var toSourceMap = parameters.toSourceMap;
    var fromSMC = new Consumer(fromSourceMap);
    var toSMC = new Consumer(toSourceMap);
    var resultMap = new Generator();
    fromSMC.eachMapping(function (mapping) {
        var generatedPosition = {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
        };
        var fromOriginalPosition = {
            line: mapping.originalLine,
            column: mapping.originalColumn
        };
        // from's generated position -> to's original position
        var originalPosition = toSMC.originalPositionFor(fromOriginalPosition);
        if (originalPosition.source !== null) {
            resultMap.addMapping({
                source: originalPosition.source,
                name : originalPosition.name,
                generated: generatedPosition,
                original: originalPosition
            });
        }
    });
    return resultMap.toString();
}

module.exports = transfer;