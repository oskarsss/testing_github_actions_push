/* eslint-disable no-use-before-define */
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Documents from '@/@core/components/documents/Documents';
import Notes from '@/@core/components/notes/Notes';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import EditTrailerHeader from '@/views/fleet/trailers/dialogs/EditTrailer/components/EditTrailerHeader';
import TrailersTypes from '@/store/fleet/trailers/types';
import { TestIDs } from '@/configs/tests';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import {
    TRAILER_OWNERSHIP_TYPE_GRPC,
    TRAILER_OWNERSHIP_TYPE_GRPC_REVERSE
} from '@/models/fleet/trailers/trailers-mappings';
import { useUpdateFormTags } from '@/store/tags/hooks';
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { usePlatesMap } from '@/store/hash_maps/hooks';
import EditTrailerFields from './components/EditTrailerFields';
import { edit_trailer_schema } from './edit_trailer_schema';

export type EditTrailerDefaultValues = {
    tags: string[];
    year?: number | null;
    reference_id: string;
    trailer_type_id: string;
    plate_id: string;
    trailer_company_id: string;
    ownership_type: TrailerOwnershipType;
    company_rent_amount: number;
    company_deposit_amount: number;
    driver_rent_amount: number;
    vendor_id: string;
    vin: string;
    make: string;
    model: string;
};

const default_values: EditTrailerDefaultValues = {
    reference_id          : '',
    trailer_type_id       : '',
    plate_id              : '',
    trailer_company_id    : '',
    ownership_type        : 'leased',
    company_rent_amount   : 0,
    company_deposit_amount: 0,
    driver_rent_amount    : 0,
    tags                  : [],
    vin                   : '',
    make                  : '',
    model                 : '',
    vendor_id             : '',
    year                  : 0
};

export const useEditTrailerForm = () => useFormContext<EditTrailerDefaultValues>();

type Props = {
    trailer: TrailerModel_Trailer;
    document_id?: string;
};

export default function EditTrailerForm({
    trailer,
    document_id
}: Props) {
    const [updateTrailer, { isLoading }] = TrailersGrpcService.useUpdateTrailerMutation();
    const editTrailerDialog = useEditTrailerDialog(true);
    const plate = usePlatesMap(trailer.plateId);
    const {
        tagIds,
        updateFormTags
    } = useUpdateFormTags('TRAILER', trailer.trailerId);

    const data_values: EditTrailerDefaultValues = useMemo(
        () => ({
            reference_id          : trailer.referenceId,
            trailer_type_id       : trailer.trailerTypeId,
            plate_id              : trailer.plateId,
            trailer_company_id    : trailer.trailerCompanyId,
            ownership_type        : TRAILER_OWNERSHIP_TYPE_GRPC[trailer.ownershipType],
            company_rent_amount   : trailer.companyRentAmount,
            company_deposit_amount: trailer.companyDepositAmount,
            driver_rent_amount    : trailer.driverRentAmount,
            vendor_id             : trailer.vendorId,
            tags                  : tagIds,
            vin                   : trailer.vin,
            make                  : trailer.make,
            model                 : trailer.model,
            year                  : trailer.year || null
        }),
        [
            trailer.vendorId,
            trailer.referenceId,
            trailer.trailerTypeId,
            trailer.plateId,
            trailer.trailerCompanyId,
            trailer.ownershipType,
            trailer.companyRentAmount,
            trailer.companyDepositAmount,
            trailer.driverRentAmount,
            tagIds,
            trailer.vin,
            trailer.make,
            trailer.model,
            trailer.year
        ]
    );

    const methods = useForm({
        defaultValues: default_values,
        values       : data_values,
        mode         : 'onChange',
        resolver     : yupResolver<EditTrailerDefaultValues>(edit_trailer_schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const save = useCallback(
        (data: EditTrailerDefaultValues) => {
            updateFormTags(data.tags);
            return updateTrailer({
                companyDepositAmount: data.company_deposit_amount,
                companyRentAmount   : data.company_rent_amount,
                driverRentAmount    : data.driver_rent_amount,
                make                : data.make,
                driverDepositAmount : 0,
                model               : data.model,
                ownershipType       : TRAILER_OWNERSHIP_TYPE_GRPC_REVERSE[data.ownership_type],
                plateId             : data.plate_id,
                referenceId         : data.reference_id,
                trailerCompanyId    : data.trailer_company_id,
                trailerId           : trailer.trailerId,
                trailerTypeId       : data.trailer_type_id,
                vendorId            : data.vendor_id,
                vin                 : data.vin,
                year                : data.year || 0
            }).unwrap();
        },
        [trailer.trailerId, updateFormTags, updateTrailer]
    );

    useEffect(() => {
        editTrailerDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [isDirty, save]);

    const document_title = `${trailer.referenceId ? `${trailer.referenceId}_` : ''} ${
        plate ? plate.number : ''
    }`;

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <EditTrailerHeader
                plate={plate}
                trailer={trailer}
                isMutationLoading={isLoading}
                onClose={editTrailerDialog.close}
            />

            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditTrailerFields trailerId={trailer.trailerId} />
                    <Notes
                        entity_type="trailer"
                        entity_id={trailer.trailerId}
                        size="small"
                        variant="outlined"
                        testOptions={{
                            messageTestId   : TestIDs.pages.editTrailer.fields.message,
                            messageBoxTestId: TestIDs.pages.editTrailer.areas.messageBox,
                            leaveNoteTestId : TestIDs.pages.editTrailer.buttons.sendMessage
                        }}
                    />
                </FullDialog.ColumnContent>
                <Documents
                    entityId={trailer.trailerId}
                    entityType={DocumentModel_DocumentEntityType.TRAILER}
                    title={document_title}
                    documentId={document_id}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
