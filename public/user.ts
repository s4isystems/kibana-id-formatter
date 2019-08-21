// @ts-ignore
import { fieldFormats } from 'ui/registry/field_formats';
import {ngApi} from './field-formatters';

export function UserNameProvider(FieldFormat: any) {
    return class UserName extends FieldFormat {
        static id = 's4i-username';
        static title = 'User Name';
        static fieldType = [
            'string',
            'number'
        ];

        _convert(value: any) {
            return ngApi.convert('users', value) || `New User (${value})`;
        }
    };
}
fieldFormats.register(UserNameProvider);
