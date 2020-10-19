import $ from "jquery";

interface Definition {
    id: number;
    name?: string;
}

type DefinitionType = 'docDefs' | 'filters' | 'users';

class NGAPI {
    private definitions?: Record<DefinitionType, Definition[]>;

    async init(): Promise<void> {
        const usp = new URLSearchParams(window.location.href);
        const url = usp.get('ng-url');
        if (!url) {
            throw new Error('No base URL provided');
        }
        const baseUrl = new URL(url);
        const ajaxSettings: JQuery.AjaxSettings = {
            type: 'GET',
            dataType: 'json',
            accepts: { json: 'application/json' },
            xhrFields: {
                withCredentials: true
            }
        };

        const [docDefs, users, filters] = await Promise.all([
            $.ajax(`${baseUrl.origin}/api/definitions${baseUrl.search}`, ajaxSettings),
            $.ajax(`${baseUrl.origin}/api/definitions/users${baseUrl.search}`, ajaxSettings),
            $.ajax(`${baseUrl.origin}/api/filters${baseUrl.search}`, ajaxSettings)
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
