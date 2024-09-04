import { NextRouter } from 'next/router';
import { Children, Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';

export const handleURLQueries = (router: NextRouter, path?: string) => {
    if (!path) return false;

    if (Object.keys(router.query).length && !router.pathname.includes('[id]')) {
        return router.asPath.includes(path) && router.pathname === path && path !== '/';
    }

    if (router.pathname.includes('[id]')) {
        return router.pathname.includes(path);
    }

    return false;
};

export const hasActiveChild = (item: Item, currentURL: string) => {
    const { children } = item;
    if (!children) {
        return false;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const child of children) {
        if (child.children) {
            if (hasActiveChild(child, currentURL)) {
                return true;
            }
        }
        const childPath = child.path;

        // Check if the child has a link and is active
        if (
            child &&
            childPath &&
            currentURL &&
            (childPath === currentURL ||
                (currentURL.includes(childPath) &&
                    !currentURL.includes('settings') &&
                    childPath !== '/'))
        ) {
            return true;
        }
    }

    return false;
};

export const removeChildren = (
    children: Children[],
    openGroup: string[],
    currentActiveGroup: string[]
) => {
    children.forEach((child) => {
        if (!currentActiveGroup.includes(child.title)) {
            const index = openGroup.indexOf(child.title);
            if (index > -1) openGroup.splice(index, 1);
            if (child.children) removeChildren(child.children, openGroup, currentActiveGroup);
        }
    });
};
