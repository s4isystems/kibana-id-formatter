export default function (kibana) {
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

        config(Joi) {
            return Joi.object({
                enabled: Joi.boolean().default(true),
            }).default();
        },
    });
}
