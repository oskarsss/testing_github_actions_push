export class WindowFocus {
    static #focused = false;

    static #listeners = new Set<(focused: boolean) => void>();

    static #initialized = false;

    static init = () => {
        this.#focused = document?.hasFocus() ?? false;
        if (this.#initialized) {
            return;
        }
        window.addEventListener('focus', () => {
            this.#focused = true;
            this.#listeners.forEach((listener) => listener(true));
        });

        window.addEventListener('blur', () => {
            this.#focused = false;
            this.#listeners.forEach((listener) => listener(false));
        });

        this.#initialized = true;
    };

    static addListener = (listener: (focused: boolean) => void) => {
        this.#listeners.add(listener);

        return {
            unsubscribe: () => {
                this.#listeners.delete(listener);
            }
        };
    };

    static get focused() {
        return this.#focused;
    }
}
