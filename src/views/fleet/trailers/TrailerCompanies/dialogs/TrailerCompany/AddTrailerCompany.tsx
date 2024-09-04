import TrailerCompany from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/TrailerCompany';
import { useForm } from 'react-hook-form';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import { TestIDs } from '@/configs/tests';
import { useEffect } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';
import { schema } from './components/schema';
import { DefaultValues, defaultValues } from './components/defaultValues';

export const useAddTrailerCompanyDialog = hookFabric(AddTrailerCompany);

export default function AddTrailerCompany() {
    const addCompanyDialog = useAddTrailerCompanyDialog(true);

    const [addCompany, { isLoading }] =
        TrailerCompaniesGrpcService.useCreateTrailerCompanyMutation();

    const method = useForm<DefaultValues>({
        defaultValues,
        resolver: yupResolver(schema)
    });
    const submit = (values: DefaultValues) => {
        addCompany(values).unwrap().then(addCompanyDialog.forceClose);
    };

    useEffect(() => {
        addCompanyDialog.confirmDialog.setDirty(method.formState.isDirty);
    }, [method.formState.isDirty, submit]);

    return (
        <TrailerCompany
            title="common:actions.add_trailer_company"
            method={method}
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={addCompanyDialog.close}
                submitLoading={isLoading}
                type="create"
                confirmTestId={TestIDs.pages.trailersCompanies.buttons.saveCompany}
                cancelTestId={TestIDs.pages.trailersCompanies.buttons.cancelCompany}
            />
        </TrailerCompany>
    );
}
