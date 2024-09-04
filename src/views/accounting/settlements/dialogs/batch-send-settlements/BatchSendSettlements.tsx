import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementsGrpcService, {
    SettlementsService
} from '@/@grpcServices/services/settlements-service/settlements.service';
import { useStableArray } from '@/hooks/useStable';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { Button, Stack, createSvgIcon } from '@mui/material';
import {
    SettlementSendBatchReply,
    SettlementSendBatchReply_SendStatus,
    SettlementSendBatchRequest
} from '@proto/settlements';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import { api } from '@/store/api';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import SubjectTextField from './SubjectTextField';
import BodyTextField from './BodyTextField';
import SendingTable from './sending-table/SendingTable';
import SendSettlementsTable from './send-table/SendTable';
import type BatchSendSettlements from './types';
import { MentionsConfig } from './MentionsPopper';

type Props = { settlementIds: string[]; cycleId: string; periodId: string };

export const SendSettlementIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g opacity="0.3">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.16146 2H16.8385C17.3656 1.99999 17.8205 1.99997 18.195 2.03057C18.5904 2.06288 18.9836 2.13419 19.362 2.32699C19.9265 2.61461 20.3854 3.07355 20.673 3.63803C20.8658 4.01641 20.9371 4.40963 20.9694 4.80498C21 5.17954 21 5.6343 21 6.16144V8.74105C19.9403 8.65627 18.8515 9.01905 18.0406 9.82937L11.4278 16.4342C11.0278 16.8337 10.6747 17.1863 10.3819 17.5973C10.1242 17.959 9.90749 18.3481 9.73569 18.7576C9.50349 19.311 9.36621 19.9342 9.28133 20.3195C9.21945 20.6004 9.14463 20.8792 9.10448 21.1643C9.08092 21.3316 9.04736 21.6364 9.11058 22H7.16144C6.6343 22 6.17954 22 5.80498 21.9694C5.40963 21.9371 5.01641 21.8658 4.63803 21.673C4.07355 21.3854 3.61461 20.9265 3.32699 20.362C3.13419 19.9836 3.06288 19.5904 3.03057 19.195C2.99997 18.8205 2.99999 18.3657 3 17.8386V6.16139C2.99999 5.6343 2.99997 5.17952 3.03057 4.80498C3.06288 4.40963 3.13419 4.01641 3.32699 3.63803C3.61461 3.07355 4.07355 2.61461 4.63803 2.32699C5.01641 2.13419 5.40963 2.06288 5.80498 2.03057C6.17952 1.99997 6.63437 1.99999 7.16146 2Z"
                fill="#0A43E1"
            />
            <path
                d="M21 17.5015V17.8386C21 18.3657 21 18.8205 20.9694 19.195C20.9371 19.5904 20.8658 19.9836 20.673 20.362C20.3854 20.9265 19.9265 21.3854 19.362 21.673C18.9836 21.8658 18.5904 21.9371 18.195 21.9694C17.8205 22 17.3657 22 16.8386 22H16.4944L21 17.5015Z"
                fill="#0A43E1"
            />
        </g>
        <path
            d="M6 7C6 6.44772 6.44772 6 7 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H7C6.44772 8 6 7.55228 6 7Z"
            fill="#0A43E1"
        />
        <path
            d="M6 11C6 10.4477 6.44772 10 7 10H12C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12H7C6.44772 12 6 11.5523 6 11Z"
            fill="#0A43E1"
        />
        <path
            d="M6 15C6 14.4477 6.44772 14 7 14H9C9.55228 14 10 14.4477 10 15C10 15.5523 9.55228 16 9 16H7C6.44772 16 6 15.5523 6 15Z"
            fill="#0A43E1"
        />
        <path
            d="M19.4539 11.2444C20.1411 10.5572 21.2554 10.5572 21.9427 11.2444C22.6299 11.9317 22.6299 13.046 21.9427 13.7332L15.4996 20.1683C14.9883 20.6796 14.7326 20.9353 14.4412 21.1383C14.1825 21.3184 13.9035 21.4673 13.6099 21.5819C13.2791 21.711 12.9244 21.7812 12.215 21.9214L12.1181 21.9405C11.7127 22.0206 11.5099 22.0607 11.3679 22C11.2439 21.947 11.1465 21.8461 11.098 21.7202C11.0424 21.5761 11.0897 21.3749 11.1843 20.9726L11.2182 20.8283C11.3733 20.1687 11.4508 19.8389 11.5798 19.5314C11.6944 19.2584 11.8388 18.9989 12.0106 18.7578C12.2041 18.4863 12.4437 18.2467 12.9229 17.7675L19.4539 11.2444Z"
            fill="#0A43E1"
        />
    </svg>,
    'BatchSendSettlementsIcon'
);

export const useSendBatchSettlements = hookFabric(BatchSendSettlements, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        paperStyle={{
            width    : '100%',
            minWidth : '1200px',
            maxWidth : '1200px',
            minHeight: '800px',
            maxHeight: '800px',
            height   : '100%'
        }}
    />
));

export const useBatchSendSettlementsForm = () =>
    useFormContext<BatchSendSettlements.DefaultValues>();

function BatchSendSettlements({
    cycleId,
    periodId,
    settlementIds
}: Props) {
    const dialog = useSendBatchSettlements(true);
    const driversMap = useDriversMap();
    const vendorsMap = useVendorsMap();
    const [startSending, setStartSending] = React.useState(false);
    const [sendingData, setSendingData] = React.useState<BatchSendSettlements.SendingItem[]>([]);
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const {
        company_id,
        token
    } = useAppSelector((state) => state.app);

    const {
        data,
        isLoading
    } = SettlementsGrpcService.useBatchSendSettlementPreviewQuery(
        {
            settlements: settlementIds.map((id) => ({
                cycleId,
                periodId,
                settlementId: id
            }))
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const rows = useStableArray(data?.previews);

    const sendsDefaultValues = useMemo(
        () =>
            rows.map((row): BatchSendSettlements.SendItem => {
                const driver = driversMap[row.driverId];
                const vendorId = driver?.vendorId;
                const vendor = vendorsMap[row.vendorId];
                if (vendorId && vendor) {
                    return {
                        recipient           : 'vendor',
                        email               : vendor.contactEmail || '',
                        phoneNumber         : vendor.contactPhoneNumber || '',
                        settlementId        : row.settlementId,
                        driverId            : row.driverId,
                        vendorId            : row.vendorId,
                        settlementFriendlyId: row.friendlyId
                    };
                }
                return {
                    recipient           : 'driver',
                    email               : driver?.email || '',
                    phoneNumber         : driver?.phoneNumber || '',
                    settlementId        : row.settlementId,
                    vendorId            : row.vendorId,
                    driverId            : row.driverId,
                    settlementFriendlyId: row.friendlyId
                };
            }),
        [driversMap, rows, vendorsMap]
    );

    const bodyTranslate = useMemo(
        () => ({
            body_1: t('modals:settlements.batch_send_settlements.fields.body_1'),
            body_2: t('modals:settlements.batch_send_settlements.fields.body_2')
        }),
        [t]
    );

    const {
        handleSubmit,
        control,
        ...formMethods
    } = useForm<BatchSendSettlements.DefaultValues>({
        defaultValues: {
            subject: `${t('entity:settlement')} #{settlementId}`,
            body   : `${bodyTranslate.body_1}, {recipient}! ${bodyTranslate.body_2}`,
            sends  : sendsDefaultValues
        },
        values: {
            subject: `${t('entity:settlement')} #{settlementId}`,
            body   : `${bodyTranslate.body_1}, {recipient}! ${bodyTranslate.body_2}`,
            sends  : sendsDefaultValues
        }
    });

    const sendHandler = (req: SettlementSendBatchRequest) =>
        new Promise<SettlementSendBatchReply>((resolve, reject) => {
            const headers = {
                Authorization: `Bearer ${token}`,
                ...(company_id ? { company_id } : {})
            };

            const stream = SettlementsService.settlementSendBatch(
                {
                    sends: req.sends
                },
                {
                    meta: headers
                }
            );
            setStartSending(true);

            const sendingData = formMethods.getValues().sends.map(
                (row): BatchSendSettlements.SendingItem => ({
                    ...row,
                    status: 'pending'
                })
            );

            setSendingData(sendingData);

            stream.responses.onMessage((data) => {
                const {
                    settlementId,
                    sendStatus
                } = data;

                if (sendStatus === SettlementSendBatchReply_SendStatus.STATUS_FAILED) {
                    setSendingData((prev) =>
                        prev.map((row) =>
                            row.settlementId === settlementId
                                ? {
                                    ...row,
                                    status   : 'failed',
                                    errorText: data.errorMessage
                                }
                                : row));
                }

                if (sendStatus === SettlementSendBatchReply_SendStatus.STATUS_OK) {
                    setSendingData((prev) =>
                        prev.map((row) =>
                            row.settlementId === settlementId
                                ? {
                                    ...row,
                                    status: 'success'
                                }
                                : row));
                }
            });
            stream.responses.onError((error) => {
                console.debug('error', error);
                reject(error);
            });
            stream.responses.onComplete(() => {
                dispatch(api.util.invalidateTags(['settlements']));
            });
        });

    const transformText = (text: string, row: BatchSendSettlements.SendItem) => {
        const driver = driversMap[row.driverId];
        const vendor = vendorsMap[row.vendorId];
        const name =
            row.recipient === 'driver'
                ? `${driver?.firstName || ''} ${driver?.lastName || ''}`
                : vendor?.name;
        return text
            .replace(MentionsConfig.recipient, name || '')
            .replace(MentionsConfig.settlementId, row.settlementFriendlyId.toString())
            .replace(MentionsConfig.email, row.email)
            .replace(MentionsConfig.phoneNumber, row.phoneNumber);
    };

    const submit = (data: BatchSendSettlements.DefaultValues) => {
        sendHandler({
            sends: data.sends.map((row) => ({
                cycleId,
                periodId,
                settlementId: row.settlementId,
                toEmail     : row.email,
                toPhone     : row.phoneNumber,
                emailBody   : transformText(data.body, row),
                emailSubject: transformText(data.subject, row)
            }))
        });
    };

    if (isLoading) {
        return (
            <Preloader
                sx={{
                    height: '100%',
                    width : '100%'
                }}
            />
        );
    }

    if (startSending) {
        return <SendingTable rows={sendingData} />;
    }

    return (
        <FormProvider {...{ control, handleSubmit, ...formMethods }}>
            <DialogComponents.Form
                style={{ height: '100%' }}
                onSubmit={handleSubmit(submit)}
            >
                <DialogComponents.Header
                    Icon={<SendSettlementIcon fontSize="large" />}
                    title="modals:settlements.batch_send_settlements.title"
                />

                <Stack
                    direction="column"
                    gap={5}
                >
                    <SubjectTextField />
                    <BodyTextField />
                    <SendSettlementsTable rows={rows} />
                </Stack>

                <DialogComponents.ActionsWrapper>
                    <DialogComponents.CancelButton onCancel={dialog.close} />
                    <Button
                        size="large"
                        sx={{
                            minWidth: '120px'
                        }}
                        variant="contained"
                        onClick={handleSubmit(submit)}
                    >
                        {t('common:button.send')}
                    </Button>
                </DialogComponents.ActionsWrapper>
            </DialogComponents.Form>
        </FormProvider>
    );
}

export default BatchSendSettlements;
