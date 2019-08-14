import _ from 'lodash';
import { fieldFormats } from 'ui/registry/field_formats';

/** Shamelessly stolen from: 
 * https://stackoverflow.com/a/901144
 */
export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function DocDefNameProvider(FieldFormat) {

    const docdefIdMap = new Map();
    let ngParams = getParameterByName('ng-url');
    console.log(ngParams);
    $.ajax({
        type: 'GET',
        url: ngParams + '/api/definitions',
        accept: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        success: function(result) {
            for (let definition of result) {
                docdefIdMap.set(definition.id, definition.hasOwnProperty('name') ? definition.name : 'New Document Definition (' + definition.id + ')');
            }
        }, 
        error: function(error) {
            // alert("Cannot get document definitions");
            console.log(error);
        }
    });

    return class DocDefName extends FieldFormat {
        static id = 's4i-docdefname';
        static title = 'Document Definition Name';
        static fieldType = [ 
            'string',
            'number'
        ];

        _convert(value) {
            if (docdefIdMap.has(value)) {
                return docdefIdMap.get(parseInt(value));
            } else {
                return 'New Document Definition (' + value + ')'
            }
        }
    }
}
fieldFormats.register(DocDefNameProvider)
