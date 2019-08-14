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
            // alert("Cannot get searches");
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
            if (searchIdMap.has(value)) {
                return searchIdMap.get(parseInt(value));
            } else {
                return 'New Search (' + value + ')'
            }
        }
    }
}
fieldFormats.register(SearchNameProvider)
