import { qsStringify } from '@/hooks/search-params-filters/useAppSearchParams';

export default function openNewWindow(url: string, isFrom?: boolean) {
    const baseUrl = window.location.origin;
    const from = isFrom ? `?from=${window.location.pathname}` : '';
    window.open(`${baseUrl}/${url}/${from}`, '_blank');
}

export function openNewWindowWithQueryParams(url: string, queryParams: Record<string, any>) {
    const baseUrl = window.location.origin;

    // const query = qsStringify(queryParams)
    const query = new URLSearchParams(qsStringify(queryParams)).toString();

    // const query = new URLSearchParams(qsStringify(queryParams)).toString();
    window.open(`${baseUrl}/${url}?${decodeURIComponent(query)}`, '_blank');
}
