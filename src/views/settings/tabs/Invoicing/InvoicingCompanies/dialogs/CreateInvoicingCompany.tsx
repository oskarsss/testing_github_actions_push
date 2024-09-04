/* eslint-disable max-len */

import { hookFabric } from '@/utils/dialog-hook-fabric';
import InvoicingCompanyGrpcService from '@/@grpcServices/services/settings-service/invoicing-company.service';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ContactInfo from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/sections/ContactInfo';
import AddressInfo from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/sections/AddressInfo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import INVOICING_COMPANY_FORM_CONFIG, {
    InvoicingCompanyDefaultValue
} from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import DetailsInfo from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/sections/DetailsInfo';

export const useCreateInvoicingCompanyDialog = hookFabric(CreateInvoicingCompany, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="600px"
        {...props}
    />
));

type Props = {
    onSuccessfulCreate?: () => void;
};

function CreateInvoicingCompany({ onSuccessfulCreate }: Props) {
    const createDialog = useCreateInvoicingCompanyDialog(true);
    const [create, createState] = InvoicingCompanyGrpcService.useCreateInvoicingCompanyMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<InvoicingCompanyDefaultValue>({
        defaultValues: INVOICING_COMPANY_FORM_CONFIG.defaultValues,
        resolver     : yupResolver<InvoicingCompanyDefaultValue>(INVOICING_COMPANY_FORM_CONFIG.schema)
    });

    const onSubmit = (payload: InvoicingCompanyDefaultValue) => {
        create({
            ...payload,
            documents: payload.documents.map((documentTypeId) => ({ documentTypeId }))
        })
            .unwrap()
            .then(() => {
                onSuccessfulCreate?.();
                createDialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DialogComponents.Header title="modals:settings.invoicing.invoicing_companies.create.title" />

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
                submitLoading={createState.isLoading}
                onCancel={createDialog.close}
                submitDisabled={!isDirty}
                type="create"
            />
        </DialogComponents.Form>
    );
}
