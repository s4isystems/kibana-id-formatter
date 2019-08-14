import _ from 'lodash';
import { fieldFormats } from 'ui/registry/field_formats';
import { getParameterByName } from './docdef';

export function SearchNameProvider(FieldFormat) {

    const searchIdMap = new Map();
    let ngParams = getParameterByName('ng-url');
    $.ajax({
        type: 'GET',
        url: ngParams + '/api/filters',
        accept: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        success: function(result) {
            for (let search of result) {
                searchIdMap.set(search.id, search.hasOwnProperty('name') ? search.name : 'New Search (' + search.id + ')');
            }
        }, 
        error: function(error) {
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

        _convert(value) {
            let intValue = parseInt(value);
            if (searchIdMap.has(intValue)) {
                return searchIdMap.get(parseInt(intValue));
            } else {
                return 'New Search (' + value + ')'
            }
        }
    }
}
fieldFormats.register(SearchNameProvider)
