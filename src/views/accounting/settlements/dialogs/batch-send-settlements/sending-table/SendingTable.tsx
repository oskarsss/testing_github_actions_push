import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import MiniTableHeader from '@/@core/ui-kits/basic/mini-table/components/MiniTableHeader';
import { Stack, createSvgIcon } from '@mui/material';
import React from 'react';
import MiniTableBody from '@/@core/ui-kits/basic/mini-table/components/MiniTableBody';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useSendBatchSettlements } from '../BatchSendSettlements';
import sending_columns from './columns';
import type BatchSendSettlements from '../types';

type Props = {
    rows: BatchSendSettlements.SendingItem[];
};

const SendSettlementIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            opacity="0.3"
            d="M11.7135 5.73656C11.2265 5.49304 10.8016 5.28057 10.4545 5.14414C10.1242 5.01433 9.65353 4.86168 9.15631 4.98008C8.54214 5.12632 8.03308 5.55398 7.78308 6.13371C7.58068 6.60306 7.64985 7.09304 7.72075 7.44077C7.79525 7.80621 7.93125 8.26139 8.08711 8.78308L8.74928 10.9998H14C14.5523 10.9998 15 11.4475 15 11.9998C15 12.552 14.5523 12.9998 14 12.9998H8.76285L8.09951 15.2014C7.94194 15.7243 7.80453 16.1803 7.72898 16.5463C7.65715 16.8944 7.58654 17.3852 7.78849 17.8556C8.03779 18.4364 8.54693 18.8652 9.16164 19.012C9.65958 19.1309 10.1313 18.9778 10.462 18.8478C10.8098 18.7111 11.2358 18.4981 11.7242 18.2538L19.6245 14.3037C20.0513 14.0903 20.4313 13.9003 20.7193 13.7219C21.0032 13.5461 21.3677 13.2836 21.5711 12.8549C21.8283 12.3125 21.8283 11.6832 21.5711 11.1408C21.3677 10.7121 21.0032 10.4497 20.7193 10.2738C20.4314 10.0954 20.0513 9.90541 19.6245 9.69206L11.7135 5.73656Z"
            fill="#0A43E1"
        />
        <path
            d="M3 6.99805C2.44772 6.99805 2 7.44576 2 7.99805C2 8.55033 2.44772 8.99805 3 8.99805H5.5C6.05228 8.99805 6.5 8.55033 6.5 7.99805C6.5 7.44576 6.05228 6.99805 5.5 6.99805H3Z"
            fill="#0A43E1"
        />
        <path
            d="M4 10.998C3.44772 10.998 3 11.4458 3 11.998C3 12.5503 3.44772 12.998 4 12.998H5.5C6.05228 12.998 6.5 12.5503 6.5 11.998C6.5 11.4458 6.05228 10.998 5.5 10.998H4Z"
            fill="#0A43E1"
        />
        <path
            d="M4.5 14.998C3.94772 14.998 3.5 15.4458 3.5 15.998C3.5 16.5503 3.94772 16.998 4.5 16.998H5.5C6.05228 16.998 6.5 16.5503 6.5 15.998C6.5 15.4458 6.05228 14.998 5.5 14.998H4.5Z"
            fill="#0A43E1"
        />
        <path
            d="M9.00434 12.1993L8.76309 13H14.0002C14.5525 13 15.0002 12.5523 15.0002 12C15.0002 11.4477 14.5525 11 14.0002 11H8.74951L9.00475 11.8544C9.03215 11.9462 9.04551 11.9914 9.05419 12.0246L9.05481 12.0269L9.05419 12.0293C9.04542 12.0624 9.03195 12.1076 9.00434 12.1993Z"
            fill="#0A43E1"
        />
    </svg>,
    'BatchSendSettlementsIcon'
);

function SendingTable({ rows }: Props) {
    const dialog = useSendBatchSettlements(true);
    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            height="100%"
        >
            <DialogComponents.Header
                Icon={<SendSettlementIcon fontSize="large" />}
                title="modals:settlements.batch_send_settlements.title_2"
            />
            <Stack
                overflow="hidden"
                maxHeight="620px"
                height="100%"
                minHeight="620px"
            >
                <MiniTableStyled.Container sx={{ overflow: 'auto' }}>
                    <MiniTableStyled.CommonTable
                        stickyHeader
                        size="small"
                        width="100%"
                    >
                        <MiniTableHeader
                            turnOffBorder
                            columns={sending_columns}
                            fontSize="medium"
                        />
                        <MiniTableBody
                            columns={sending_columns}
                            rows={rows}
                            fontSize="medium"
                            elementKey="settlementId"
                            executeAction={() => {}}
                        />
                    </MiniTableStyled.CommonTable>
                </MiniTableStyled.Container>
            </Stack>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton
                    onCancel={() => dialog.close()}
                    cancel_text="common:button.close"
                />
            </DialogComponents.ActionsWrapper>
        </Stack>
    );
}

export default SendingTable;
