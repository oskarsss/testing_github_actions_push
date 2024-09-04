import React from 'react';
import moment from 'moment-timezone';
import { Typography } from '@mui/material';
import DriverDocumentsStyled from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/styled';
import { DOCUMENT_STATUS_ICONS } from '@/@core/theme/entities/document/status';
import DocTabsComponents from './styled';
import Documents from '../../../../../store/documents/types';

type Props = {
    expires_at: string;
    status: Documents.Status;
    doc_type_expirable: boolean;
    margin_right?: number;
};

export default function StatusIcon({
    expires_at,
    status,
    doc_type_expirable,
    margin_right = 24
}: Props) {
    const expiration_date = moment(expires_at);
    const current_date = moment();
    const diff = current_date.diff(expiration_date, 'days') || 0;
    return (
        <>
            {DOCUMENT_STATUS_ICONS[status]}

            {doc_type_expirable && diff > 0 && (
                <DriverDocumentsStyled.ExpiresBlock marginRight={margin_right}>
                    <DocTabsComponents.EventBusyIcon />
                    {diff > 0 && diff < 29 && (
                        <Typography
                            fontSize="12px"
                            textTransform="lowercase"
                            color="#F04438"
                            fontWeight={500}
                        >
                            {diff}d
                        </Typography>
                    )}
                </DriverDocumentsStyled.ExpiresBlock>
            )}
        </>
    );
}
