import { useCallback, useEffect, useMemo } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FullDialog from '@/@core/ui-kits/full-dialog';
import Notes from '@/@core/components/notes/Notes';
import Documents from '@/@core/components/documents/Documents';
import EditPlateHeaderContent from '@/views/fleet/plates/dialogs/EditPlate/components/EditPlateHeader';
import EditPlateFields from '@/views/fleet/plates/dialogs/EditPlate/components/EditPlateFields';
import { Country } from '@/models/country/country';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { PlateModel } from '@proto/models/model_plate';
import PlatesGrpcService, {
    CountryCodeGrpc,
    CountryCodeGrpcReverse,
    VehicleTypeGrpc,
    VehicleTypeGrpcReverse
} from '@/@grpcServices/services/plates.service';
import { edit_plate_schema } from './schema';
import { useEditPlateDialog } from './EditPlate';

export type FormValues = {
    plate_id: string;
    plate_company_id: string;
    number: string;
    country: Country;
    state: string;
    vehicle_type: string;
    owner_name: string;
    annual_cost: number;
    owned: boolean;
};

export const useEditPlateForm = () => useFormContext<FormValues>();

type Props = {
    plate: PlateModel;
    document_id?: string;
    refetch: () => void;
};

const default_values: FormValues = {
    plate_id        : '',
    plate_company_id: '',
    number          : '',
    vehicle_type    : '',
    owner_name      : '',
    country         : 'US',
    state           : '',
    annual_cost     : 0,
    owned           : false
};

export default function EditPlateForm({
    plate,
    document_id,
    refetch
}: Props) {
    const editPlateDialog = useEditPlateDialog(true);

    const [updatePlate, { isLoading }] = PlatesGrpcService.useUpdatePlateMutation();

    const dataValues: FormValues = useMemo(
        () => ({
            plate_id        : plate.plateId,
            number          : plate.number,
            vehicle_type    : VehicleTypeGrpcReverse[plate.vehicleType] || 'truck',
            owner_name      : plate.ownerName,
            country         : CountryCodeGrpcReverse[plate.countryCode],
            state           : plate.state,
            annual_cost     : plate.annualCost,
            owned           : plate.owned,
            plate_company_id: plate.plateCompanyId
        }),
        [
            plate.plateId,
            plate.number,
            plate.vehicleType,
            plate.ownerName,
            plate.countryCode,
            plate.state,
            plate.annualCost,
            plate.owned,
            plate.plateCompanyId
        ]
    );

    const save = useCallback(
        (data: FormValues) => {
            const {
                plate_id,
                ...body
            } = data;

            return updatePlate({
                annualCost    : body.annual_cost,
                countryCode   : CountryCodeGrpc[body.country],
                number        : body.number,
                owned         : body.owned,
                ownerName     : body.owner_name,
                plateId       : plate.plateId,
                state         : body.state,
                plateCompanyId: body.plate_company_id,
                vehicleType   : VehicleTypeGrpc[body.vehicle_type]
            });
        },
        [plate.plateId, updatePlate]
    );

    const methods = useForm<FormValues>({
        defaultValues: default_values,
        values       : dataValues,
        resolver     : yupResolver(edit_plate_schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    useEffect(() => {
        editPlateDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [isDirty, save]);

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <EditPlateHeaderContent
                plate={plate}
                isMutationLoading={isLoading}
                onClose={editPlateDialog.close}
            />

            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditPlateFields />
                    <Notes
                        entity_type="plate"
                        entity_id={plate.plateId}
                        size="normal"
                        variant="outlined"
                    />
                </FullDialog.ColumnContent>

                <Documents
                    entityId={plate.plateId}
                    entityType={DocumentModel_DocumentEntityType.PLATE}
                    title={`${plate.state}-${plate.number}`}
                    documentId={document_id}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
