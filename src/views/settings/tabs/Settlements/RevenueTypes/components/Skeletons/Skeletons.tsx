import React from 'react';
import { Skeleton } from '@mui/material';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import SKELETON_OPTIONS from './options/skeleton_options';
import TypeSkeleton from './Type/Type';

export default function Skeletons() {
    return (
        <>
            <PageHeadersKit.Header
                topLeft={(
                    <Skeleton
                        variant="rounded"
                        width={SKELETON_OPTIONS.views.width}
                        height={SKELETON_OPTIONS.views.height}
                    />
                )}
                topRight={(
                    <Skeleton
                        variant="rounded"
                        width={SKELETON_OPTIONS.addCycleBtn.width}
                        height={SKELETON_OPTIONS.addCycleBtn.height}
                    />
                )}
            />
            <TypeSkeleton />
        </>
    );
}
