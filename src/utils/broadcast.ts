import { WindowFocus } from './windowFocus';

export class BroadcastUpdates<DataType> {
    #channel: BroadcastChannel;

    #listeners = new Set<(data: DataType) => void>();

    constructor(channelName: string) {
        this.#channel = new BroadcastChannel(channelName);

        this.#channel.onmessage = (event: MessageEvent<DataType>) => {
            if (WindowFocus.focused) {
                return;
            }

            this.#listeners.forEach((listener) => listener(event.data));
        };
    }

    postUpdate = (data: DataType) => {
        this.#channel.postMessage(data);
    };

    addMessageListener = (listener: (data: DataType) => void) => {
        this.#listeners.add(listener);

        return {
            unsubscribe: () => {
                this.#listeners.delete(listener);
            }
        };
    };
}
