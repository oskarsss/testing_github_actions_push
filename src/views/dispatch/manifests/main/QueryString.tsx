// import QueryStringCover from '@/@core/components/query-string-cover';
// import {
//     manifestDefaultFilters,
//     useManifestsStats
// } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
// import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
// import { UpdateManifestFilters } from '@/services/dispatch/manifests/actions/cash';
// import { useAppDispatch } from '@/services/hooks';

// const { page } = PAGES_FILTERS_CONFIG.DISPATCH.MANIFEST;
// export default function QueryString() {
//     const dispatch = useAppDispatch();
//     const {
//         selected_filters,
//         selected_view_id,
//         views
//     } = useManifestsStats();

//     const filtersHandler = (vId: string, filters: any) => {
//         dispatch(UpdateManifestFilters(vId, filters));
//     };

//     return (
//         <QueryStringCover
//             selectedFilters={selected_filters}
//             selectedViewId={selected_view_id}
//             page={page}
//             views={views}
//             filtersHandler={filtersHandler}
//             defaultValues={manifestDefaultFilters}
//             defaultViewId={views[0].view_id}
//             joinFilterId
//         />
//     );
// }
