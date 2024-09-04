import { useMemo } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import { ObjectSchema } from 'yup';
import StateSelect from '@/@core/fields/select/StateSelect';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import type { PlateCompanyCreateRequest } from '@proto/plate.company';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';

export const useCompanyMenu = menuHookFabric(CompanyMenu);
type FormValues = PlateCompanyCreateRequest;

const schema: ObjectSchema<FormValues> = yup.object().shape({
    name: yup.string().min(2).max(20)
        .required(),
    referenceId: yup.string().defined(),
    state      : yup.string().defined()
});

const defaultValues: FormValues = {
    name       : '',
    referenceId: '',
    state      : ''
};

type Props = {
    enteredValue?: string;
    onAdded: (company_id: string) => void;
};
export default function CompanyMenu({
    enteredValue,
    onAdded
}: Props) {
    const { t } = useAppTranslation();
    const companyMenu = useCompanyMenu(true);

    const [addCompany, { isLoading }] = PlateCompaniesGrpcService.useCreatePlateCompanyMutation();

    const dataValues: FormValues | undefined = useMemo(() => {
        if (!enteredValue) return undefined;
        return {
            ...defaultValues,
            name: enteredValue
        };
    }, [enteredValue]);

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues,
        values  : dataValues,
        resolver: yupResolver(schema)
    });

    const save = (values: FormValues) => {
        addCompany(values)
            .unwrap()
            .then((response) => {
                onAdded?.(response.plateCompanyId);
                reset();
                companyMenu.close();
            });
    };

    const onClose = () => companyMenu.close();

    return (
        <MenuComponents.Form
            width="400px"
            padding="24px"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                handleSubmit(save)();
            }}
        >
            <MenuComponents.FormHeader text="modals:plates.add_company.header.title" />

            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        name="name"
                        label="modals:plates.add_company.fields.name.label"
                        placeholder="modals:plates.add_company.fields.name.placeholder"
                        width="100%"
                        size="medium"
                    />
                </MenuComponents.Field>
                <MenuComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:plates.add_company.fields.reference_id.label"
                        name="referenceId"
                        placeholder="modals:plates.add_company.fields.reference_id.placeholder"
                        width="100%"
                        size="medium"
                    />
                </MenuComponents.Field>
                <MenuComponents.Field xs={12}>
                    <StateSelect
                        label="fields:state.label"
                        name="state"
                        control={control}
                        errors={errors}
                        width="100%"
                    />
                </MenuComponents.Field>
                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={onClose} />
                    <MenuComponents.SubmitButton
                        loading={isLoading}
                        text="common:button.add"
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
