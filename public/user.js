import _ from 'lodash';
import { fieldFormats } from 'ui/registry/field_formats';
import { getParameterByName } from './docdef';

export function UserNameProvider(FieldFormat) {

    const userIdMap = new Map();
    let ngParams = getParameterByName('ng-url');
    $.ajax({
        type: 'GET',
        url: ngParams + '/api/definitions/users',
        accept: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        success: function(result) {
            for (let user of result) {
                userIdMap.set(user.id, user.hasOwnProperty('name') ? user.name : 'New User (' + user.id + ')');
            }
        }, 
        error: function(error) {
            // alert("Cannot get users");
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

        _convert(value) {
            if (userIdMap.has(value)) {
                return userIdMap.get(parseInt(value));
            } else {
                return 'New User (' + value + ')'
            }
        }
    }
}
fieldFormats.register(UserNameProvider)
