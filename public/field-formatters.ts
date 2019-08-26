import $ from "jquery";

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

interface Definition {
    id: number;
    name?: string;
}

type DefinitionType = 'docDefs' | 'filters' | 'users';

class NGAPI {
    private definitions?: Record<DefinitionType, Definition[]>;

    async init(): Promise<void> {
        const baseUrl = getParameterByName('ng-url');
        if (!baseUrl) {
            throw new Error('No base URL provided');
        }
        const ajaxSettings: JQuery.AjaxSettings = {
            type: 'GET',
            dataType: 'json',

            accepts: { json: 'application/json' },
            xhrFields: {
                withCredentials: true
            }
        };

        const [docDefs, users, filters] = await Promise.all([
            $.ajax(baseUrl + '/api/definitions', ajaxSettings),
            $.ajax(baseUrl + '/api/definitions/users', ajaxSettings),
            $.ajax(baseUrl + '/api/filters', ajaxSettings)
        ]);

        this.definitions = {docDefs, filters, users};
    }

    convert(type: DefinitionType, value: string | number): string | undefined {
        if (!this.definitions) {
            // not initialized
            return;
        }
        const intValue = typeof value === 'string' ? parseInt(value) : value;
        const definition = this.definitions[type].find(d => d.id === intValue);
        return definition && definition.name;
    }
}

export const ngApi = new NGAPI();
