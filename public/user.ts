// @ts-ignore
import { fieldFormats } from 'ui/registry/field_formats';
import { getParameterByName } from './docdef';
import $ from 'jquery';

export function UserNameProvider(FieldFormat: any) {

    const userIdMap = new Map();
    const ngParams = getParameterByName('ng-url');
    $.ajax({
        type: 'GET',
        url: ngParams + '/api/definitions/users',
        accepts: { dataType: 'application/json' },
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            for (const user of result) {
                userIdMap.set(user.id, user.hasOwnProperty('name') ? user.name : 'New User (' + user.id + ')');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    return class UserName extends FieldFormat {
        static id = 's4i-username';
        static title = 'User Name';
        static fieldType = [
            'string',
            'number'
        ];

        _convert(value: any) {
            const intValue = parseInt(value);
            if (userIdMap.has(intValue)) {
                return userIdMap.get(intValue);
            } else {
                return 'New User (' + value + ')';
            }
        }
    };
}
fieldFormats.register(UserNameProvider)
