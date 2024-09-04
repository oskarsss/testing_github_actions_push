/* eslint-disable no-tabs */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import Documents from '@/@core/components/documents/Documents';
import Notes from '@/@core/components/notes/Notes';
import FullDialog from '@/@core/ui-kits/full-dialog';
import TrucksTypes from '@/store/fleet/trucks/types';
import { TestIDs } from '@/configs/tests';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useUpdateFormTags } from '@/store/tags/hooks';
import { TruckModel_Truck, TruckModel_Type } from '@proto/models/model_truck';
import { usePlatesMap } from '@/store/hash_maps/hooks';
import { useEditTruckDialog } from './EditTruck';
import { edit_truck_schema } from './schema';
import EditTruckHeaderContent from './components/EditTruckHeader';
import EditTruckFields from './components/EditTruckFields';

export type EditTruckDefaultValues = Pick<
    TruckModel_Truck,
    | 'truckId'
    | 'vin'
    | 'make'
    | 'model'
    | 'plateId'
    | 'referenceId'
    | 'tollTransponder'
    | 'color'
    | 'vendorId'
    | 'fuelDiscountsEnabled'
    | 'type'
> & {
    tags: string[];
    year?: number | null;
};

export const useEditTruckForm = () => useFormContext<EditTruckDefaultValues>();

type Props = {
    truck: TruckModel_Truck;
    document_id?: string;
};

const default_values: EditTruckDefaultValues = {
    truckId             : '',
    vin                 : '',
    make                : '',
    model               : '',
    year                : 0,
    plateId             : '',
    referenceId         : '',
    tollTransponder     : '',
    color               : '',
    vendorId            : '',
    tags                : [],
    fuelDiscountsEnabled: false,
    type                : TruckModel_Type.UNSPECIFIED
};

export default function EditTruckForm({
    truck,
    document_id
}: Props) {
    const editTruckDialog = useEditTruckDialog(true);
    const plate = usePlatesMap(truck.plateId);

    const [updateTruck, { isLoading }] = TrucksGrpcService.useUpdateTruckMutation();
    const {
        tagIds,
        updateFormTags
    } = useUpdateFormTags('TRUCK', truck.truckId);

    const save = (formData: EditTruckDefaultValues) => {
        updateFormTags(formData.tags);
        updateTruck({
            color               : formData.color,
            fuelDiscountsEnabled: formData.fuelDiscountsEnabled,
            make                : formData.make,
            model               : formData.model,
            plateId             : formData.plateId,
            referenceId         : formData.referenceId,
            tollTransponder     : formData.tollTransponder,
            truckId             : formData.truckId,
            type                : formData.type,
            vendorId            : formData.vendorId,
            vin                 : formData.vin,
            year                : formData.year || 0,
            trailer_id          : truck.trailerId
        });
    };

    const dataValues: EditTruckDefaultValues = useMemo(
        () => ({
            truckId             : truck.truckId,
            plateId             : truck.plateId,
            referenceId         : truck.referenceId,
            type                : truck.type,
            tollTransponder     : truck.tollTransponder,
            color               : truck.color,
            vendorId            : truck.vendorId,
            tags                : tagIds,
            fuelDiscountsEnabled: truck.fuelDiscountsEnabled,
            vin                 : truck.vin,
            make                : truck.make,
            model               : truck.model,
            year                : truck.year
        }),
        [
            truck.truckId,
            truck.plateId,
            truck.referenceId,
            truck.type,
            truck.tollTransponder,
            truck.color,
            truck.vendorId,
            tagIds,
            truck.fuelDiscountsEnabled,
            truck.vin,
            truck.make,
            truck.model,
            truck.year
        ]
    );

    const methods = useForm<EditTruckDefaultValues>({
        defaultValues: default_values,
        values       : dataValues,
        resolver     : yupResolver(edit_truck_schema),
        mode         : 'onBlur'
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    // useEffect(() => {
    //     editTruckDialog.confirmDialog.setDirty(isDirty, {
    //         confirm_text    : 'common:button.save_and_close',
    //         delete_text     : 'common:button.close',
    //         max_width_dialog: '500px',
    //         onConfirm       : handleSubmit(save),
    //         onDelete        : () => {}
    //     });
    // }, [isDirty, save]);

    const document_title = `${truck.referenceId ? `${truck.referenceId} ` : ' '} ${
        plate ? `${plate.state}-${plate.number}` : ''
    }`;

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <EditTruckHeaderContent
                plate={plate}
                truck={truck}
                isMutationLoading={isLoading}
                onClose={editTruckDialog.close}
            />

            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditTruckFields
                        truckId={truck.truckId}
                        insuredEndorsed={truck.insuranceEndorsed}
                    />
                    <Notes
                        entity_type="truck"
                        entity_id={truck.truckId}
                        size="small"
                        variant="outlined"
                        testOptions={{
                            messageTestId   : TestIDs.pages.editTruck.fields.message,
                            messageBoxTestId: TestIDs.pages.editTruck.areas.messageBox,
                            leaveNoteTestId : TestIDs.pages.editTruck.buttons.sendMessage
                        }}
                    />
                </FullDialog.ColumnContent>

                <Documents
                    documentId={document_id}
                    entityId={truck.truckId}
                    entityType={DocumentModel_DocumentEntityType.TRUCK}
                    title={document_title}

                    // testOptions={{
                    //     documentDropzoneTestId : TestIDs.pages.editTruck.fields.dropDocument,
                    //     addDocumentTestId      : TestIDs.pages.editTruck.buttons.addDocument,
                    //     addDocumentCenterTestId:
                    //  TestIDs.pages.editTruck.buttons.addDocumentCenter,
                    //     deleteDocumentTestId   :
                    //  TestIDs.pages.editTruck.buttons.deleteDocumentIcon,
                    //     confirmDeleteDocumentTestId:
                    //         TestIDs.pages.editTruck.buttons.confirmDeleteDocument
                    // }}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
