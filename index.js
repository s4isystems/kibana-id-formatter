export default function (kibana) {
    return new kibana.Plugin({
        require: ['elasticsearch', 'kibana'],
        name: 'kibana-s4i-ng-plugin',
        uiExports: {
            fieldFormats: [
                'plugins/kibana-s4i-ng-plugin/docdef',
                'plugins/kibana-s4i-ng-plugin/user',
                'plugins/kibana-s4i-ng-plugin/search'
            ]
        },

        config(Joi) {
            return Joi.object({
                enabled: Joi.boolean().default(true),
            }).default();
        },
    });
}
