/* eslint-disable max-len */
import MenuComponents from '@/@core/ui-kits/menus';
import { MenuItem, PopoverPosition, SxProps, Theme } from '@mui/material';
import { FunctionComponent, PropsWithChildren, useCallback, useEffect, MouseEvent } from 'react';
import { useMenuAndDialogContext } from '../context/DialogAndMenuContext';

export type MenuRequiredProps = PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    keepMounted?: boolean;
    name?: string;
    anchorPosition?: PopoverPosition | undefined;
    anchorEl?: HTMLElement;
    sx?: SxProps<Theme>;
}>;

/**
 * ### Vektor Menu Hook Fabric
 * #### Description:
 * This hook is used to create menu hook.
 * By default it will be wrapped with `MenuWrapper` from `MenuComponents`
 * @param Component Component that will be rendered inside menu
 * @param config
 * @param config.renderAfterFirstShow If `true` menu will be rendered only after first open
 * @param config.cleanContentOnClose If `true` content will be removed from menu after close
 * @param config.keepMounted If `true` menu will be mounted even if it's closed
 * @param MenuWrapper Wrapper that will be used to wrap menu. By default it's `MenuWrapper` from `MenuComponents`
 * @example Example 1 (Default MenuWrapper)
 * export const useTruckOptionsMenu = menuHookFabric(TruckOptionsMenu);
 *
 *
 * @example Example 2 (Custom MenuWrapper)
 * ... TODO: Vlad add example
 *
 */

export const menuHookFabric = function <T> (
    Component: React.FunctionComponent<T>,
    config?: {
        renderAfterFirstShow?: boolean;
        cleanContentOnClose?: boolean;
        keepMounted?: boolean;
    },
    MenuWrapper: FunctionComponent<
        Omit<MenuRequiredProps, 'keepMounted'>
    > = MenuComponents.MenuWrapper
) {
    let usedHooks = 0;
    const key = Component.name + Math.random();
    let firstRenderContent = true;

    /**
     * @param calledInMenu Pass `true` if you use this hook inside menu assigned to this hook
     * @example
     * export const useTruckOptionsMenu = menuHookFabric(TruckOptionsMenu);
     *
     * function TruckOptionsMenu() {
     *   const { close } = useTruckOptionsMenu(true);
     *   return (
     *      <Menu onClose={close} />
     *   )
     * }
     */
    return (calledInMenu = false) => {
        const {
            addWrapper,
            editWrapper,
            removeWrapper,
            setContent,
            removeContent
        } =
            useMenuAndDialogContext<MenuRequiredProps>();

        const close = useCallback(() => {
            editWrapper({
                open : false,
                Props: { open: false },
                key
            });
            if (config?.cleanContentOnClose) {
                removeContent(key);
            }
        }, [editWrapper]);

        const mountMenu = useCallback(
            (Component: FunctionComponent<MenuRequiredProps>, key: string) => {
                addWrapper({
                    Wrapper: Component,
                    Props  : {
                        keepMounted: !config?.renderAfterFirstShow,
                        open       : false,
                        onClose    : close,
                        name       : key
                    },
                    key,
                    Content: <MenuItem />
                });
                return () => {
                    removeWrapper(key);
                };
            },
            []
        );

        useEffect(() => {
            if (calledInMenu) {
                return () => {};
            }
            usedHooks += 1;
            let unmount: () => void = () => {};
            if (usedHooks === 1) {
                unmount = mountMenu(MenuWrapper, key);
            }

            return () => {
                if (usedHooks <= 1) {
                    unmount();
                    usedHooks = 0;
                    return;
                }
                usedHooks -= 1;
            };
        }, [mountMenu, calledInMenu]);

        const open = useCallback(
            (props: T) => (event: MouseEvent<HTMLElement>) => {
                let keepMounted = config?.keepMounted;
                if (
                    keepMounted === undefined &&
                    config?.renderAfterFirstShow &&
                    firstRenderContent
                ) {
                    keepMounted = true;
                    firstRenderContent = false;
                }
                const Props: MenuRequiredProps = {
                    anchorEl      : event.currentTarget,
                    anchorPosition: { top: event.clientY, left: event.clientX },
                    name          : key,
                    open          : true,
                    onClose       : close
                };
                if (keepMounted !== undefined) {
                    Props.keepMounted = keepMounted;
                }
                editWrapper({ setProps: () => Props, key });

                setContent(
                    key,
                    <Component
                        key={key}
                        {...props}
                    />
                );
            },
            [editWrapper, setContent]
        );

        return {
            open,
            close
        };
    };
};
