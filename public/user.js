"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const field_formats_1 = require("ui/registry/field_formats");
const docdef_1 = require("./docdef");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
function UserNameProvider(FieldFormat) {
    var _a;
    const userIdMap = new Map();
    const ngParams = docdef_1.getParameterByName('ng-url');
    jquery_1.default.ajax({
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
    return _a = class UserName extends FieldFormat {
            _convert(value) {
                const intValue = parseInt(value);
                if (userIdMap.has(intValue)) {
                    return userIdMap.get(intValue);
                }
                else {
                    return 'New User (' + value + ')';
                }
            }
        },
        _a.id = 's4i-username',
        _a.title = 'User Name',
        _a.fieldType = [
            'string',
            'number'
        ],
        _a;
}
exports.UserNameProvider = UserNameProvider;
field_formats_1.fieldFormats.register(UserNameProvider);
