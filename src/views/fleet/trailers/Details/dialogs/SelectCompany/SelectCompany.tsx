import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuProps } from '@/views/fleet/drivers/Details/menus/types';
import TrailerCompanySelect from '@/@core/fields/select/TrailerCompanySelect';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { TestIDs } from '@/configs/tests';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';

type Fields = {
    trailer_company_id: string;
};
const schema: ObjectSchema<Fields> = yup.object().shape({
    trailer_company_id: yup.string().required()
});
const defaultValues: Fields = {
    trailer_company_id: ''
};

export const useSelectCompanyDialog = hookFabric(SelectCompany, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="400px"
        {...props}
    />
));

export default function SelectCompany({ id }: MenuProps) {
    const dialog = useSelectCompanyDialog(true);
    const [assignCompanyToTrailer, { isLoading }] =
        TrailersGrpcService.useAssignCompanyToTrailerMutation();

    const {
        handleSubmit,
        control,
        formState: { isDirty }
    } = useForm<Fields>({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const create: SubmitHandler<Fields> = async (data) => {
        assignCompanyToTrailer({
            trailerId       : id,
            trailerCompanyId: data.trailer_company_id
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header title="modals:trailers.select.company.header.title" />

            <DialogComponents.Field xs={12}>
                <TrailerCompanySelect
                    control={control}
                    label="fields:company_id.label"
                    name="trailer_company_id"
                    testOptions={{
                        inputTestID: TestIDs.pages.trailerProfile.fields.company,
                        addTestId  : TestIDs.pages.trailerProfile.buttons.addCompany
                    }}
                />
            </DialogComponents.Field>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />

                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={!isDirty || isLoading}
                    text="common:button.confirm"
                    testID={TestIDs.pages.trailerProfile.buttons.confirmSelectingCompany}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
