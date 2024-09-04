import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { TestIDs } from '@/configs/tests';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { TruckType, TruckTypes } from '@/models/fleet/trucks/truck-type';
import { TRUCK_TYPE_TO_GRPC_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { Wrapper } from '@/views/accounting/settlements/dialogs/edit-settlement/options';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TFunction } from 'i18next';
import { useAppDispatch } from '@/store/hooks';
import { TrucksDataActions } from '@/store/storage/trucks/slice';

const truckTypeOptions = (t: TFunction) => [
    {
        id   : '1',
        value: 'owner_operator',
        label: () => (
            <Wrapper>
                {TRUCK_TYPE_ICONS.owner_operator}
                <span>{t('state_info:trucks.type.owner_operator')}</span>
            </Wrapper>
        )
    },
    {
        id   : '2',
        value: 'owned',
        label: () => (
            <Wrapper>
                {TRUCK_TYPE_ICONS.owned}
                <span>{t('state_info:trucks.type.owned')}</span>
            </Wrapper>
        )
    },
    {
        id   : '3',
        value: 'leased',
        label: () => (
            <Wrapper>
                {TRUCK_TYPE_ICONS.leased}
                <span>{t('state_info:trucks.type.leased')}</span>
            </Wrapper>
        )
    }
];

export const useAddTruckDialog = hookFabric(AddTruckDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="500px"
    />
));

type FormValues = {
    reference_id: string;
    vin: string;
    type: TruckType;
};

const schema: ObjectSchema<FormValues> = yup.object().shape({
    reference_id: yup.string().trim().required('Unit Number is a required field'),
    vin         : yup.string().trim().length(17, 'VIN must be exactly 17 characters')
        .required(),
    type: yup.string<TruckType>().required('Type is required field')
});

type Props = {
    onSuccessfulCreate?: (truckId: string) => void;
};

function AddTruckDialog({ onSuccessfulCreate }: Props) {
    const { t } = useAppTranslation();
    const addTruckDialog = useAddTruckDialog(true);
    const dispatch = useAppDispatch();

    const [createTruck, { isLoading }] = TrucksGrpcService.useCreateTruckMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<FormValues>({
        defaultValues: {
            reference_id: '',
            vin         : '',
            type        : TruckTypes.OWNER_OPERATOR
        },
        resolver: yupResolver(schema)
    });

    const create = (data: FormValues) => {
        createTruck({
            referenceId: data.reference_id,
            vin        : data.vin,
            type       : TRUCK_TYPE_TO_GRPC_ENUM[data.type]
        })
            .unwrap()
            .then((response) => {
                addTruckDialog.close().then(() => {
                    if (response.truck) {
                        dispatch(
                            TrucksDataActions.UpdateTruck({
                                isCacheUpdate: false,
                                truck        : response.truck
                            })
                        );
                        onSuccessfulCreate?.(response.truck?.truckId);
                    }
                });
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header title="common:actions.add_truck" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetTrucks.fields.truckNumber}
                        label="modals:trucks.add.fields.reference_id.label"
                        name="reference_id"
                        placeholder="modals:trucks.add.fields.reference_id.placeholder"
                        width="100%"
                        autoFocus
                        required
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetTrucks.fields.truckVINNumber}
                        label="modals:trucks.add.fields.vin.label"
                        name="vin"
                        placeholder="fields:vin.placeholder"
                        width="100%"
                        required
                        inputProps={{
                            inputProps: {
                                maxLength: 17
                            }
                        }}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <SelectInput
                        required
                        width="100%"
                        name="type"
                        label="fields:type.label"
                        testID={TestIDs.pages.fleetTrucks.fields.truckType}
                        control={control}
                        errors={errors}
                        options={truckTypeOptions(t)}
                        optionTestID={TestIDs.components.select.truckType.optionPrefix}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.DefaultActions
                onCancel={addTruckDialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
                type="create"
                cancelTestId={TestIDs.pages.fleetTrucks.buttons.cancelAddingTruck}
                confirmTestId={TestIDs.pages.fleetTrucks.buttons.confirmAddingTruck}
            />
        </DialogComponents.Form>
    );
}
