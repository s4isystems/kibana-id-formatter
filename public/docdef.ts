// @ts-ignore
import { fieldFormats } from 'ui/registry/field_formats';
import { ngApi } from './field-formatters';

export function DocDefNameProvider(FieldFormat: any) {
    return class DocDefName extends FieldFormat {
        static id = 's4i-docdefname';
        static title = 'Document Definition Name';
        static fieldType = [
            'string',
            'number'
        ];

        _convert(value: any) {
            return ngApi.convert('docDefs', value) || `New Document Definition (${value})`;
        }
    };
}
fieldFormats.register(DocDefNameProvider);
