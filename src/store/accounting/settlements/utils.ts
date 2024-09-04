import API_TAGS from '@/store/api_tags';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { GetResultDescriptionFn } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export const invalidateSettlement = function <
    ResultType,
    RequestType extends
        | {
              settlement_id?: string;
          }
        | {
              settlementId?: string;
          }
> (
    _result: ResultType,
    _error?: FetchBaseQueryError,
    arg?: RequestType
): ReturnType<
    GetResultDescriptionFn<
        (typeof API_TAGS)[keyof typeof API_TAGS],
        ResultType,
        RequestType,
        FetchBaseQueryError,
        object
    >
> {
    if (!arg) return ['settlements', 'settlement_periods'];
    let id = 'settlement_id' in arg ? arg?.settlement_id : '';
    if ('settlementId' in arg) id = arg.settlementId;
    if (!id) return ['settlements', 'settlement_periods'];
    return [
        { type: 'settlement', id },
        { type: 'settlement_sync', id },
        'settlements',
        'settlement_periods'
    ] as const;
};
