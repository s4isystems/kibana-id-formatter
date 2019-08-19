"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const field_formats_1 = require("ui/registry/field_formats");
const docdef_1 = require("./docdef");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
function SearchNameProvider(FieldFormat) {
    var _a;
    const searchIdMap = new Map();
    const ngParams = docdef_1.getParameterByName('ng-url');
    jquery_1.default.ajax({
        type: 'GET',
        url: ngParams + '/api/filters',
        accepts: { json: 'application/json' },
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            for (const search of result) {
                searchIdMap.set(search.id, search.hasOwnProperty('name') ? search.name : 'New Search (' + search.id + ')');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
    return _a = class SearchName extends FieldFormat {
            _convert(value) {
                const intValue = parseInt(value);
                if (searchIdMap.has(intValue)) {
                    return searchIdMap.get(intValue);
                }
                else {
                    return 'New Search (' + value + ')';
                }
            }
        },
        _a.id = 's4i-searchname',
        _a.title = 'Search Name',
        _a.fieldType = [
            'string',
            'number'
        ],
        _a;
}
exports.SearchNameProvider = SearchNameProvider;
field_formats_1.fieldFormats.register(SearchNameProvider);
