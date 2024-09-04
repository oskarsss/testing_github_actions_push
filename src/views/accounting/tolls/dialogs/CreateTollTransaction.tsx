import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useState } from 'react';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useForm } from 'react-hook-form';
import DateInput from '@/@core/fields/inputs/DateInput';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import TrailersSelect from '@/@core/fields/select/trailer-select/TrailersSelect';
import CommonTabs from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import { formatDateTimeToUnix } from '@/utils/formatting';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { selectedVehicleOptions } from './constants';

export const useCreateTollTransactionDialog = hookFabric(CreateTollTransaction, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="530px"
        {...props}
    />
));

type DefaultValues = {
    truck_id: string;
    trailer_id: string;
    amount: number;
    date: number | string;
    source: string;
    toll_agency: string;
    reference_id: string;
};

type Props = {
    truckId?: string;
    trailerId?: string;
    onSuccessfulCreate?: () => void;
};

export default function CreateTollTransaction({
    truckId = '',
    trailerId = '',
    onSuccessfulCreate
}: Props) {
    const createTollDialog = useCreateTollTransactionDialog(true);
    const [selectedEntity, setSelectedEntity] = useState(
        trailerId
            ? DocumentModel_DocumentEntityType.TRAILER
            : DocumentModel_DocumentEntityType.TRUCK
    );

    const [createToll, { isLoading }] = TollsGrpcService.useCreateTollMutation();

    const {
        control,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm<DefaultValues>({
        defaultValues: {
            truck_id    : truckId,
            trailer_id  : trailerId,
            amount      : 0,
            date        : Date.now(),
            source      : '',
            toll_agency : '',
            reference_id: ''
        }
    });

    const onSubmit = (data: DefaultValues) => {
        createToll({
            amount     : data.amount,
            datetime   : formatDateTimeToUnix(data.date),
            referenceId: data.reference_id,
            source     : data.source,
            tollAgency : data.toll_agency,
            trailerID:
                selectedEntity === DocumentModel_DocumentEntityType.TRAILER ? data.trailer_id : '',
            truckID: selectedEntity === DocumentModel_DocumentEntityType.TRUCK ? data.truck_id : ''
        })
            .unwrap()
            .then(() => {
                onSuccessfulCreate?.();
                createTollDialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DialogComponents.Header title="modals:tolls.add.title" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CommonTabs
                        value={selectedEntity}
                        options={selectedVehicleOptions}
                        aria-label="edit settlement tabs"
                        onChange={(_, value) => {
                            setSelectedEntity(value);
                            setValue('truck_id', '');
                            setValue('trailer_id', '');
                        }}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    {selectedEntity === DocumentModel_DocumentEntityType.TRUCK ? (
                        <TruckSelect
                            name="truck_id"
                            control={control}
                        />
                    ) : (
                        <TrailersSelect
                            control={control}
                            name="trailer_id"
                        />
                    )}
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <AmountInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="fields:amount.label"
                        name="amount"
                        placeholder="fields:amount.placeholder"
                        step={1}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <DateInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="fields:datetime.label"
                        name="date"
                        type="datetime"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="fields:reference_id.label"
                        name="reference_id"
                        placeholder="fields:reference_id.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="fields:source.label"
                        name="source"
                        placeholder="fields:source.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="fields:toll_agency.label"
                        name="toll_agency"
                        placeholder="fields:toll_agency.placeholder"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={createTollDialog.close}
                type="create"
                submitLoading={isLoading}
            />
        </DialogComponents.Form>
    );
}
