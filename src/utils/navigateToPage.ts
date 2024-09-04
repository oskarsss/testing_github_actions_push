import Router from 'next/router';
import NProgress from 'nprogress';
import type { ParsedUrlQueryInput } from 'querystring';

export default function navigateToPage(
    pathname: string,
    e?: any,
    query?: string | ParsedUrlQueryInput | null | undefined,
    search?: string | null | undefined
) {
    return new Promise((resolve) => {
        if (e?.ctrlKey || e?.metaKey || e?.shiftKey) {
            resolve(true);

            return;
        }

        NProgress.start();
        Router.push({
            pathname,
            query,
            search
        }).then(() => {
            NProgress.done();
            resolve(true);
        });
    });
}
