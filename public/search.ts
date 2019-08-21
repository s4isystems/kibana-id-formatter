// @ts-ignore
import { fieldFormats } from 'ui/registry/field_formats';
import { ngApi } from './field-formatters';

export function SearchNameProvider(FieldFormat: any) {
    return class SearchName extends FieldFormat {
        static id = 's4i-searchname';
        static title = 'Search Name';
        static fieldType = [
            'string',
            'number'
        ];

        _convert(value: any) {
            return ngApi.convert('filters', value) || `New Search (${value})`;
        }
    };
}
fieldFormats.register(SearchNameProvider);
