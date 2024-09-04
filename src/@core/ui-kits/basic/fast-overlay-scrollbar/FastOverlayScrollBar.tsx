import {
    OverlayScrollbarsComponent,
    type OverlayScrollbarsComponentProps,
    OverlayScrollbarsComponentRef
} from 'overlayscrollbars-react';
import { forwardRef } from 'react';
import { OverlayScrollbars, Plugin } from 'overlayscrollbars';

type PluginModuleInstance = {
    setWheelSpeed: (speed: number) => void;
    resetWheelSpeed: () => void;
};

export const wheelPlugin: Plugin<'wheelSpeed', void, PluginModuleInstance> = {
    wheelSpeed: {
        instance(osInstance, event) {
            let wheelSpeed = 1;
            const { viewport } = osInstance.elements();

            const wheelListener = (e: WheelEvent) => {
                if (!wheelSpeed) {
                    return;
                }

                const { deltaY } = e;
                const element = e.currentTarget as HTMLElement | null;
                if (!element) {
                    return;
                }
                const scrollDiff = deltaY * wheelSpeed;

                const {
                    scrollTop,
                    scrollHeight,
                    clientHeight
                } = element;

                const newScroll = scrollTop + scrollDiff;

                if (scrollTop >= scrollHeight || !scrollDiff) {
                    return;
                }

                e.preventDefault();
                if (newScroll < 0) {
                    element.scrollTo({ top: 0 });
                    return;
                }
                const maxScroll = scrollHeight - clientHeight;
                if (newScroll > maxScroll) {
                    element.scrollTo({ top: maxScroll });
                    return;
                }

                element.scrollTo({ top: newScroll });
            };
            viewport.addEventListener('wheel', wheelListener);

            const instancePluginModuleInstance = {
                setWheelSpeed: (speed: number) => {
                    if (speed > 0) {
                        wheelSpeed = speed;
                        return;
                    }
                    wheelSpeed = 1;
                },
                resetWheelSpeed: () => {
                    wheelSpeed = 1;
                }
            };

            event('destroyed', () => {
                viewport.removeEventListener('wheel', wheelListener);
            });

            return instancePluginModuleInstance;
        }
    }
};

OverlayScrollbars.plugin(wheelPlugin);

type Props = Omit<OverlayScrollbarsComponentProps, 'ref'> & { wheelSpeed?: number };

const FastOverlayScrollBar = forwardRef<OverlayScrollbarsComponentRef, Props>(
    ({
        children,
        wheelSpeed = 3,
        ...props
    }, ref) => (
        <OverlayScrollbarsComponent
            ref={ref}
            events={{
                initialized(instance) {
                    instance.plugin(wheelPlugin)?.setWheelSpeed(wheelSpeed);
                }
            }}
            options={{
                scrollbars: {
                    autoHide: 'leave'
                }
            }}
            defer
            {...props}
        >
            {children}
        </OverlayScrollbarsComponent>
    )
);

export default FastOverlayScrollBar;
