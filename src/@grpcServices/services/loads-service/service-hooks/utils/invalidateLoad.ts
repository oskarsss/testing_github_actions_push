import API_TAGS from '@/store/api_tags';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { GetResultDescriptionFn } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

// const InvalidateLoad = function <ResultType, RequestType extends { loadId: string }> (
//     _result: ResultType,
//     _error?: FetchBaseQueryError,
//     arg?: RequestType
// ): ReturnType<
//     GetResultDescriptionFn<
//         (typeof API_TAGS)[keyof typeof API_TAGS],
//         ResultType,
//         RequestType,
//         FetchBaseQueryError,
//         object
//     >
// > {
//     if (!arg) return ['loads'];
//     const id = 'loadId' in arg ? arg?.loadId : '';

//     // const manifestId = 'manifestId' in arg ? (arg?.manifestId as string) : '';
//     if (!id) return ['loads'];

//     // if (!manifestId) return [{ type: 'load', id }, 'loads'] as const;
//     return [{ type: 'load', id }, 'loads'] as const;
// };

// export default InvalidateLoad;
