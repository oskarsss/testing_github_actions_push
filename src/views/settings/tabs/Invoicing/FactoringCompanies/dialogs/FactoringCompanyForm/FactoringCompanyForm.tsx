import { FormProvider, useFormContext, UseFormReturn } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import Details from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/Details/Details';
import ContactInfo from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/ContactInfo';
import AddressInfo from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/AddressInfo';
import { memo } from 'react';
import { FactoringCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/factoring-company-form-config';

type Props = {
    methods: UseFormReturn<FactoringCompanyDefaultValue>;
    onSubmit: (data: FactoringCompanyDefaultValue) => void;
    isLoading: boolean;
    onClose: () => void;
    isEdit?: boolean;
    companyName?: string;
};

export const useFactoringCompanyFormContext = () => useFormContext<FactoringCompanyDefaultValue>();

function FactoringCompanyForm({
    methods,
    onSubmit,
    isLoading,
    onClose,
    isEdit,
    companyName
}: Props) {
    return (
        <FormProvider {...methods}>
            <DialogComponents.Form onSubmit={methods.handleSubmit(onSubmit)}>
                <DialogComponents.Header
                    title={
                        isEdit
                            ? 'modals:settings.invoicing.factoring_companies.update.header.title'
                            : 'modals:settings.invoicing.factoring_companies.create.header.title'
                    }
                    translationOptions={{ companyName: companyName || '' }}
                />

                <DialogComponents.Fields columnSpacing={0}>
                    <Details />

                    <ContactInfo />

                    <AddressInfo />
                </DialogComponents.Fields>

                <DialogComponents.DefaultActions
                    submitLoading={isLoading}
                    onCancel={onClose}
                    submitDisabled={!methods.formState.isDirty}
                    type={isEdit ? 'update' : 'create'}
                />
            </DialogComponents.Form>
        </FormProvider>
    );
}

export default memo(FactoringCompanyForm);
