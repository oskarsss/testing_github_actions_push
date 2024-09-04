import { AUTHORIZED_USER } from '@/store/auth/api';
import {
    LoadsView,
    defaultActiveView,
    defaultView,
    defaultViewFilters,
    loadsDefaultViews
} from './loads-default-models';

export const getCompanyId = () => localStorage.getItem(AUTHORIZED_USER.COMPANY_ID) || '';

export const getStorageViews = (LS_KEY_VIEWS: string): Record<string, LoadsView[]> => {
    const views = localStorage.getItem(LS_KEY_VIEWS);

    if (views) {
        const parsedViews = JSON.parse(views);
        return parsedViews || {};
    }

    return {};
};

export const updateStorageViews = (views: LoadsView[], LS_KEY_VIEWS: string) => {
    const company_id = getCompanyId();
    const storageViews = getStorageViews(LS_KEY_VIEWS);
    const updatedViews = { ...storageViews, [company_id]: views };
    localStorage.setItem(LS_KEY_VIEWS, JSON.stringify(updatedViews));
};

export const compareLoadViews = (LS_KEY: string) => {
    const company_id = getCompanyId();
    const storageViews = getStorageViews(LS_KEY);

    const views = storageViews[company_id] || loadsDefaultViews;

    const comparedViews = views.reduce((acc, view) => {
        const aKeys = Object.keys(defaultViewFilters).sort();
        const bKeys = Object.keys(view.filters).sort();
        const isEqual = JSON.stringify(aKeys) === JSON.stringify(bKeys);

        if (isEqual && view.type) {
            acc.push(view);
        }

        if (view.type === 'default' && !isEqual) {
            acc.push(defaultView);
        }
        if (view.type === 'default_active' && !isEqual) {
            acc.push(defaultActiveView);
        }

        return acc;
    }, [] as LoadsView[]);

    return comparedViews.length < 3 ? loadsDefaultViews : comparedViews;
};
