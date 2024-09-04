/* eslint-disable no-nested-ternary */
import React, { memo } from 'react';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import Avatar from '@mui/material/Avatar';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type DriverTableSelfieProps = {
    row: {
        selfieThumbUrl: string;
        firstName: string;
        lastName: string;
    };
    rowHeight: number;
};

function DriverTableSelfie({
    row,
    rowHeight
}: DriverTableSelfieProps) {
    const { url } = usePrivateFileUrl(row.selfieThumbUrl);

    const width =
        rowHeight === PAGE_ROW_HEIGHT_CONFIG.small
            ? '22px'
            : rowHeight === PAGE_ROW_HEIGHT_CONFIG.medium
                ? '31px'
                : '40px';
    const height =
        rowHeight === PAGE_ROW_HEIGHT_CONFIG.small
            ? '22px'
            : rowHeight === PAGE_ROW_HEIGHT_CONFIG.medium
                ? '31px'
                : '40px';

    return (
        <Avatar
            alt={`${row.firstName} ${row.lastName}`}
            src={url}
            sx={{ width, height, marginRight: '10px', fontSize: '12px' }}
        >
            {row.firstName?.charAt(0).toUpperCase()}
            {row.lastName?.charAt(0).toUpperCase()}
        </Avatar>
    );
}

export default memo(DriverTableSelfie);
