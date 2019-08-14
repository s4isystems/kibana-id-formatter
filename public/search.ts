// @ts-ignore
import { fieldFormats } from 'ui/registry/field_formats';
import { getParameterByName } from './docdef';
import $ from 'jquery';

export function SearchNameProvider(FieldFormat: any) {

    const searchIdMap = new Map();
    const ngParams = getParameterByName('ng-url');
    $.ajax({
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

    return class SearchName extends FieldFormat {
        static id = 's4i-searchname';
        static title = 'Search Name';
        static fieldType = [
            'string',
            'number'
        ];

        _convert(value: any) {
            const intValue = parseInt(value);
            if (searchIdMap.has(intValue)) {
                return searchIdMap.get(intValue);
            } else {
                return 'New Search (' + value + ')';
            }
        }
    };
}
fieldFormats.register(SearchNameProvider);
