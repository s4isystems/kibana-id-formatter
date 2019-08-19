"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const field_formats_1 = require("ui/registry/field_formats");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
/** Shamelessly stolen from:
 * https://stackoverflow.com/a/901144
 */
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
exports.getParameterByName = getParameterByName;
function DocDefNameProvider(FieldFormat) {
    var _a;
    const docdefIdMap = new Map();
    const ngParams = getParameterByName('ng-url');
    jquery_1.default.ajax({
        type: 'GET',
        url: ngParams + '/api/definitions',
        accepts: { json: 'application/json' },
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            for (const definition of result) {
                docdefIdMap.set(definition.id, definition.name || 'New Document Definition (' + definition.id + ')');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
    return _a = class DocDefName extends FieldFormat {
            _convert(value) {
                const intValue = parseInt(value);
                if (docdefIdMap.has(intValue)) {
                    return docdefIdMap.get(intValue);
                }
                else {
                    return 'New Document Definition (' + value + ')';
                }
            }
        },
        _a.id = 's4i-docdefname',
        _a.title = 'Document Definition Name',
        _a.fieldType = [
            'string',
            'number'
        ],
        _a;
}
exports.DocDefNameProvider = DocDefNameProvider;
field_formats_1.fieldFormats.register(DocDefNameProvider);
