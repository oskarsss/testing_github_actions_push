/* eslint-disable max-len */

import { hookFabric } from '@/utils/dialog-hook-fabric';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';
import { useForm } from 'react-hook-form';
import INVOICING_COMPANY_FORM_CONFIG, {
    InvoicingCompanyDefaultValue
} from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DetailsInfo from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/sections/DetailsInfo';
import ContactInfo from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/sections/ContactInfo';
import AddressInfo from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/sections/AddressInfo';
import { useMemo } from 'react';

export const useEditInvoicingCompanyDialog = hookFabric(EditInvoicingCompany, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="600px"
        {...props}
    />
));

type Props = {
    onSuccessfulCreate?: () => void;
    invoicingCompanyId: string;
};

function EditInvoicingCompany({
    onSuccessfulCreate,
    invoicingCompanyId
}: Props) {
    const editDialog = useEditInvoicingCompanyDialog(true);
    const [update, updateState] = InvoicingCompanyGrpcService.useUpdateInvoicingCompanyMutation();
    const { data } = InvoicingCompanyGrpcService.useRetrieveInvoicingCompanyQuery({
        invoicingCompanyId
    });

    const valuesData = useMemo(() => {
        if (!data?.invoicingCompany) return undefined;

        const {
            documents,
            deleted,
            createdAt,
            updatedAt,
            invoicingCompanyId,
            isDefault,
            ...invoicingCompany
        } = data.invoicingCompany;

        return {
            ...invoicingCompany,
            documents: documents.map((d) => d.documentTypeId)
        };
    }, [data?.invoicingCompany]);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<InvoicingCompanyDefaultValue>({
        defaultValues: INVOICING_COMPANY_FORM_CONFIG.defaultValues,
        values       : valuesData,
        resolver     : yupResolver<InvoicingCompanyDefaultValue>(INVOICING_COMPANY_FORM_CONFIG.schema)
    });

    const onSubmit = (payload: InvoicingCompanyDefaultValue) => {
        update({
            ...payload,
            invoicingCompanyId,
            documents: payload.documents.map((documentTypeId) => ({ documentTypeId }))
        })
            .unwrap()
            .then(() => {
                onSuccessfulCreate?.();
                editDialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DialogComponents.Header
                title="modals:settings.invoicing.invoicing_companies.edit.title"
                translationOptions={{ companyName: data?.invoicingCompany?.name || '' }}
            />

            <DialogComponents.Fields columnSpacing={0}>
                <DetailsInfo
                    control={control}
                    errors={errors}
                />

                <ContactInfo
                    control={control}
                    errors={errors}
                />

                <AddressInfo
                    control={control}
                    errors={errors}
                />
            </DialogComponents.Fields>

            <DialogComponents.DefaultActions
                submitLoading={updateState.isLoading}
                onCancel={editDialog.close}
                submitDisabled={!isDirty}
                type="create"
            />
        </DialogComponents.Form>
    );
}
