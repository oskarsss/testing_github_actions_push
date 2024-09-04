/* eslint-disable no-nested-ternary */

import React, { memo } from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DraftsHeader from '@/views/new-loads/views/drafts-header/DraftsHeader';
import Draft from '@/views/new-loads/views/Draft/Draft';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import NewLoadsDialog from './NewLoadsDialog';

export const useNewLoadsDialog = hookFabric(NewLoads, NewLoadsDialog);

function NewLoads() {
    const {
        data,
        isLoading,
        isFetching
    } = LoadDraftsGrpcService.useGetDraftsQuery(
        {},
        {
            refetchOnMountOrArgChange: true,
            pollingInterval          : 2500
        }
    );

    const hasDrafts = (data?.loadDrafts.length || 0) > 0;

    return (
        <>
            <DraftsHeader />

            {isLoading || (!hasDrafts && isFetching) ? <Preloader /> : hasDrafts ? <Draft /> : null}
        </>
    );
}

export default memo(NewLoads);
