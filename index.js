"use strict";
exports.__esModule = true;
function default_1(kibana) {
    return new kibana.Plugin({
        require: ['elasticsearch', 'kibana'],
        name: 's4i_id_field_formatter',
        uiExports: {
            fieldFormats: [
                'plugins/s4i_id_field_formatter/docdef',
                'plugins/s4i_id_field_formatter/user',
                'plugins/s4i_id_field_formatter/search'
            ]
        },
        config: function (Joi) {
            return Joi.object({
                enabled: Joi.boolean()["default"](true)
            })["default"]();
        }
    });
}
exports["default"] = default_1;
