import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';
import { useForm } from 'react-hook-form';
import INVOICING_COMPANY_FORM_CONFIG, {
    InvoicingCompanyDefaultValue
} from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import { yupResolver } from '@hookform/resolvers/yup';
import { InvoicingCompanyGetReply_InvoicingCompany } from '@proto/invoicing_company';
import React, { useCallback, useMemo, useState } from 'react';
import Container from '@/views/settings/components/Container/Container';
import MapSettingsHeader from '@/views/settings/components/MapSections/MapSettingsHeader';
import InvoicingCompaniesItemFields from '@/views/settings/tabs/Invoicing/InvoicingCompanies/components/InvicingCompaniesItemFields';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DeleteButton from '@/views/settings/tabs/Invoicing/InvoicingCompanies/components/actions/DeleteButton';
import SetDefaultButton from '@/views/settings/tabs/Invoicing/InvoicingCompanies/components/actions/SetDefaultButton';
import RestoreButton from '@/views/settings/tabs/Invoicing/InvoicingCompanies/components/actions/RestoreButton';

type Props = {
    row: InvoicingCompanyGetReply_InvoicingCompany;
};

export default function InvoicingCompaniesItem({ row }: Props) {
    const { t } = useAppTranslation();
    const [isEdit, setIsEdit] = useState(false);
    const [update, updateState] = InvoicingCompanyGrpcService.useUpdateInvoicingCompanyMutation();

    const valuesData = useMemo(() => {
        const {
            documents,
            deleted,
            createdAt,
            updatedAt,
            invoicingCompanyId,
            isDefault,
            ccEmails,
            ...invoicingCompany
        } = row;

        return {
            ...invoicingCompany,
            ccEmails : ccEmails.filter(Boolean),
            documents: documents.map((d) => d.documentTypeId)
        };
    }, [row]);

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty
        }
    } = useForm<InvoicingCompanyDefaultValue>({
        defaultValues: INVOICING_COMPANY_FORM_CONFIG.defaultValues,
        values       : valuesData,
        resolver     : yupResolver(INVOICING_COMPANY_FORM_CONFIG.schema)
    });

    const onSubmit = useCallback(
        (payload: InvoicingCompanyDefaultValue) => {
            update({
                ...payload,
                documents         : payload.documents.map((documentTypeId) => ({ documentTypeId })),
                invoicingCompanyId: row.invoicingCompanyId
            })
                .unwrap()
                .then(() => {
                    setIsEdit(false);
                });
        },
        [update, row.invoicingCompanyId]
    );

    const onCancel = useCallback(() => {
        reset();
        setIsEdit(false);
    }, [reset]);

    return (
        <Container sx={{ mb: '16px' }}>
            <MapSettingsHeader
                title={<span>{row.name}</span>}
                isEdit={isEdit}
                isDirty={isDirty}
                isLoading={updateState.isLoading}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={onCancel}
                onEdit={() => setIsEdit(true)}
                disabled={row.deleted}
                children_left_side={
                    row.isDefault && (
                        <Badge
                            utilityColor="success"
                            icon={<CheckCircleIcon sx={{ fill: 'currentColor !important' }} />}
                            text={t(
                                'settings:settlements.revenue_types.type.header.status.default'
                            )}
                        />
                    )
                }
            >
                {!row.isDefault && (
                    <SetDefaultButton
                        disabled={row.isDefault || row.deleted}
                        invoicingCompanyId={row.invoicingCompanyId}
                    />
                )}
                {row.deleted ? (
                    <RestoreButton invoicingCompanyId={row.invoicingCompanyId} />
                ) : (
                    <DeleteButton invoicingCompanyId={row.invoicingCompanyId} />
                )}
            </MapSettingsHeader>
            <InvoicingCompaniesItemFields
                control={control}
                errors={errors}
                isEdit={isEdit}
            />
        </Container>
    );
}
