export class Interceptor<Name extends string, Url extends string> {
    #name: Name;
    #url: Url;
    #method: 'GET' | 'POST';
    #intercepted: boolean = false;
    constructor(name: Name, url: Url, method: 'GET' | 'POST' = 'GET') {
        this.#name = name;
        this.#url = url;
        this.#method = method;
    }

    get hash(): `@${Name}` {
        return `@${this.#name}`;
    }

    get url(): Url {
        return this.#url;
    }

    get name(): Name {
        return this.#name;
    }

    readonly wait = () => {
        if (!this.#intercepted) {
            throw new Error(`Interceptor ${this.name} was not intercepted`);
        }
        return cy.wait(this.hash);
    };

    readonly intercept = () => {
        this.#intercepted = true;
        return cy.intercept(this.#method, this.url).as(this.name);
    };

    private static instance: Interceptor<any, any> | null = null;

    static getInstance<Name extends string, Url extends string>(
        name: Name,
        url: Url,
        method: 'GET' | 'POST' = 'GET'
    ) {
        if (!Interceptor.instance) {
            Interceptor.instance = new Interceptor(name, url, method);
        }
        return Interceptor.instance as Interceptor<Name, Url>;
    }
}

export const getSchedulePage = new Interceptor('getSchedulePage', 'scheduling.json');
export const getLoadDraftsPage = new Interceptor('getLoadDraftsPage', 'api/v1/loads/drafts');
export const getLoadsPage = new Interceptor('getLoadsPage', 'loads/drafts');
export const createDriver = new Interceptor('postDriver', 'api/v1/drivers');
