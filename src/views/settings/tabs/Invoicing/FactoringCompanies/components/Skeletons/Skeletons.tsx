import React from 'react';
import { Skeleton } from '@mui/material';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import SKELETON_OPTIONS from './options/skeleton_options';
import CompanySkeleton from './Company/Company';

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
            />
            <CompanySkeleton />
        </>
    );
}
