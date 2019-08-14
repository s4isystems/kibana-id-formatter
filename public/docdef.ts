// @ts-ignore
import { fieldFormats } from 'ui/registry/field_formats';
import $ from 'jquery';

// declare const $: any

/** Shamelessly stolen from:
 * https://stackoverflow.com/a/901144
 */
export function getParameterByName(name: string, url?: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function DocDefNameProvider(FieldFormat: any) {

    const docdefIdMap = new Map();
    const ngParams = getParameterByName('ng-url');
    $.ajax({
        type: 'GET',
        url: ngParams + '/api/definitions',
        accepts: { json: 'application/json' },
        xhrFields: {
            withCredentials: true
        },
        success: function (result: any[]) {
            for (const definition of result) {
                docdefIdMap.set(definition.id, definition.name || 'New Document Definition (' + definition.id + ')');
            }
        },
        error: function (error) {
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

        _convert(value: string) {
            const intValue = parseInt(value);
            if (docdefIdMap.has(intValue)) {
                return docdefIdMap.get(intValue);
            } else {
                return 'New Document Definition (' + value + ')';
            }
        }
    };
}
fieldFormats.register(DocDefNameProvider);
