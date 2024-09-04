import { useMemo } from 'react';
import qs from 'qs';
import { useSearchParams } from 'next/navigation';

export const qsParser = (search: string) =>
    qs.parse(search, { comma: true, ignoreQueryPrefix: true, parseArrays: true });

export const qsStringify = (search: object) =>
    qs.stringify(search, {
        addQueryPrefix  : true,
        encodeValuesOnly: true,
        arrayFormat     : 'comma',
        encode          : false,

        // @ts-ignore
        commaRoundTrip: true
    });

export const useAppSearchParams = () => {
    const search = useSearchParams();
    return useMemo(() => qsParser(decodeURIComponent(search.toString())), [search]);
};
