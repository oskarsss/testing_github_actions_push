/* eslint-disable max-len */

import { FormEvent, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import SettlementsTypes from '@/store/accounting/settlements/types';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { Stack, Typography } from '@mui/material';
import SendSettlementDriverAppChip from '@/views/accounting/settlements/dialogs/send-settlement/components/SendSettlementDriverAppChip';
import SendSettlementAttachmentsFields from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/send-settlement-fields/SendSettlementAttachmentsFields';
import SendSettlementAlsoSendFields from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/send-settlement-fields/SendSettlementAlsoSendFields';
import SendSettlementMessageFields from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/send-settlement-fields/SendSettlementMessageFields';
import SendSettlementControllers from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-left-side/SendSettlementControllers';
import SendSettlementRightSide from '@/views/accounting/settlements/dialogs/send-settlement/components/send-settlement-right-side/SendSettlementRightSide';
import {
    DefaultValues,
    schema
} from '@/views/accounting/settlements/dialogs/send-settlement/helpers';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import { useRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { MentionsConfig } from '@/views/accounting/settlements/dialogs/send-settlement/components/MentionsPopper';

type Props = {
    settlement: SettlementsTypes.CycleSettlementDetails.Settlement;
    cycle_id: string;
    period_id: string;
};

export const useSendSettlementDialog = hookFabric(SendSettlement, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="1000px"
        paperStyle={{
            minHeight: '800px'
        }}
        {...props}
    />
));

function SendSettlement({
    settlement,
    cycle_id,
    period_id
}: Props) {
    const { t } = useAppTranslation();
    const sendSettlementDialog = useSendSettlementDialog(true);

    const driversMap = useDriversMap();
    const driver = driversMap[settlement.driverId || ''];
    const vendor = useVendorsMap(settlement.vendorId || '');

    const [sendSettlement, { isLoading }] = SettlementsGrpcService.useSendSettlementMutation();

    const { documentTypes } = useActiveDocumentTypes();
    const { revenue_types } = useRevenueTypes();

    const settlementDocumentTypes = useMemo(() => {
        if (!driver?.settlementRevenueTypeId) return [];

        const revenueType = revenue_types.find(
            (type) => type.revenueTypeId === driver?.settlementRevenueTypeId
        );

        if (!revenueType) return [];

        return documentTypes.filter(
            (docType) =>
                docType.entityType === DocumentModel_DocumentEntityType.LOAD &&
                revenueType.attachDocumentTypeIds.includes(docType.documentTypeId)
        );
    }, [documentTypes, driver?.settlementRevenueTypeId, revenue_types]);

    const loadIds = useMemo(() => {
        const Ids: string[] = [];
        settlement.manifestsInfo?.manifests.forEach((manifest) => {
            if (manifest.settlementId) {
                manifest.loads.forEach((load) => {
                    Ids.push(load.loadId);
                });
            }
        });
        return Ids;
    }, [settlement.manifestsInfo]);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            subject                    : t('modals:settlements.send_settlement.fields.subject'),
            body                       : t('modals:settlements.send_settlement.fields.body'),
            option_email_to_driver     : !!driver?.email,
            option_email_to_vendor     : !!vendor?.email,
            option_email_to_cc_emails  : false,
            option_sms_to_driver       : false,
            option_attachment_documents: !!loadIds?.length && !!driver?.settlementRevenueTypeId
        },
        resolver: yupResolver(schema)
    });

    const transformText = (text: string, type: 'driver' | 'vendor') => {
        const name =
            type === 'driver'
                ? `${driver?.firstName || ''} ${driver?.lastName || ''}`
                : vendor?.name;

        return text
            .replace(MentionsConfig.recipient, name || '')
            .replace(
                MentionsConfig.settlementId,
                settlement.settlementFriendlyId?.toString() || ''
            );
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        handleSubmit((payload: DefaultValues) => {
            const sendToDriver =
                (payload.option_sms_to_driver || payload.option_email_to_driver) && driver;
            const sendToVendor = payload.option_email_to_vendor && vendor;
            sendSettlement({
                cycleId              : cycle_id,
                periodId             : period_id,
                settlementId         : settlement.settlementId,
                sendToCompanyCcEmails: !!payload.option_email_to_cc_emails,
                attachDocuments      : !!payload.option_attachment_documents,

                ...(sendToDriver
                    ? {
                        recipientDriver: {
                            subject: transformText(payload.subject, 'driver'),
                            body   : transformText(payload.body, 'driver'),
                            ...(payload.option_sms_to_driver
                                ? {
                                    phoneNumber: driver.phoneNumber
                                }
                                : {}),
                            ...(payload.option_email_to_driver
                                ? {
                                    email: driver.email
                                }
                                : {})
                        }
                    }
                    : {}),

                ...(sendToVendor
                    ? {
                        recipientVendor: {
                            email  : vendor?.email || '',
                            subject: transformText(payload.subject, 'vendor'),
                            body   : transformText(payload.body, 'vendor')
                        }
                    }
                    : {})
            })
                .unwrap()
                .then(sendSettlementDialog.close);
        })(e);
    };

    return (
        <DialogComponents.Form
            onSubmit={submit}
            style={{
                display      : 'flex',
                flexDirection: 'column',
                height       : '100%',
                overflow     : 'hidden',
                flexGrow     : 1
            }}
        >
            <DialogComponents.Header
                title={(
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        gap="12px"
                    >
                        <Typography
                            fontSize="20px"
                            fontWeight={600}
                            lineHeight={1.3}
                        >
                            {t('modals:settlements.send_settlement.title')}
                        </Typography>
                        <SendSettlementDriverAppChip driverId={settlement.driverId} />
                    </Stack>
                )}
            />

            <Stack
                flexDirection="row"
                gap="16px"
                alignItems="stretch"
                height="100%"
                overflow="hidden"
                flexGrow={1}
            >
                <Stack
                    flex="3 1 0"
                    gap="16px"
                    overflow="hidden auto"
                    pl="4px"
                >
                    <SendSettlementMessageFields control={control} />

                    <SendSettlementAlsoSendFields
                        control={control}
                        errors={errors}
                        driverId={settlement.driverId}
                        vendorId={settlement.vendorId}
                        driverEmail={driver?.email}
                        vendorEmail={vendor?.email}
                        driverPhone={driver?.phoneNumber}
                    />

                    <SendSettlementAttachmentsFields
                        control={control}
                        errors={errors}
                        documentTypes={settlementDocumentTypes}
                        loadIds={loadIds}
                        revenueTypeId={driver?.settlementRevenueTypeId}
                        driverId={settlement.driverId}
                    />

                    <SendSettlementControllers
                        control={control}
                        sendTo={vendor ? 'vendor' : 'driver'}
                        dialogClose={sendSettlementDialog.close}
                        isLoading={isLoading}
                    />
                </Stack>
                <Stack
                    flex="4 1 0"
                    overflow="hidden"
                >
                    <SendSettlementRightSide
                        documentTypes={settlementDocumentTypes}
                        loadIds={loadIds}
                        settlementId={settlement.settlementId}
                        cycleId={cycle_id}
                        periodId={period_id}
                    />
                </Stack>
            </Stack>
        </DialogComponents.Form>
    );
}
