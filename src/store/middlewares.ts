import objectEntries from '@/utils/objectEntries';
import { Middleware } from '@reduxjs/toolkit';
import { QueryCacheKey } from '@reduxjs/toolkit/query';

type InvalidationState<TagType extends string> = {
    [_ in TagType]: {
        [id: string]: QueryCacheKey[];
        [id: number]: QueryCacheKey[];
    };
};

type QueryAction = {
    meta?: {
        arg?: {
            queryCacheKey?: string;
            type?: string;
        };
    };
};

export const createQueryTagListener = function <TagType extends string, State extends object> (
    getProvided: (store: State) => InvalidationState<TagType>,
    onMessage: (tag: TagType) => void
): Middleware {
    return (store) => (next) => (action) => {
        const provided = getProvided(store.getState() as State);
        const KeyToTagMap = new Map<string, string>();
        objectEntries(provided).forEach(
            ([tag, value]: [TagType, InvalidationState<TagType>[TagType]]) => {
                objectEntries(value).forEach(([_, queryCacheKeys]) => {
                    queryCacheKeys.forEach((key) => {
                        KeyToTagMap.set(key, tag);
                    });
                });
            }
        );

        const cacheKey = (action as QueryAction).meta?.arg?.queryCacheKey;
        const type = (action as QueryAction).meta?.arg?.type;
        const mapKey = cacheKey ? cacheKey.replace(/\//g, '') : '';
        const tag = KeyToTagMap.get(mapKey) as TagType;
        if (type === 'query' && tag) {
            onMessage(tag);
        }
        return next(action);
    };
};

// const middelware: Middleware =
//   (store) => (next) => (action: QueryAction) => {
//     const api = (store.getState() as AppRootState).grpcAPI;
//     const KeyToTagMap = new Map<string, string>();
//     objectEntries(api.provided).forEach(([tag, value]) => {
//       objectEntries(value).forEach(([_, queryCacheKeys]) => {
//         queryCacheKeys.forEach((key) => {
//           KeyToTagMap.set(key, tag);
//         });
//       });
//     });

//     const cacheKey = action.meta?.arg?.queryCacheKey;
//     const type = action.meta?.arg?.type;
//     const mapKey = cacheKey ? cacheKey.replace(/\//g, '') : '';
//     const tag = KeyToTagMap.get(mapKey);
//     if (type === 'query' && tag) {
//       Updates.invalidateTag(tag as GrpcTags);
//     }
//     return next(action);
//   };
