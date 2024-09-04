import FullDialog from '@/@core/ui-kits/full-dialog';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import {
    default_values,
    DefaultValues,
    schema
} from '@/views/accounting/tolls/dialogs/EditTollTransaction/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import EditTollTransactionFields from '@/views/accounting/tolls/dialogs/EditTollTransaction/components/EditTollTransactionFields';
import EditTollTransactionHeader from '@/views/accounting/tolls/dialogs/EditTollTransaction/components/EditTollTransactionHeader';
import EditTollTransactionNote from '@/views/accounting/tolls/dialogs/EditTollTransaction/components/EditTollTransactionNote';
import { formatDateTimeToUnix } from '@/utils/formatting';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { TollRetrieveReply } from '@proto/tolls';

type Props = {
    toll: TollRetrieveReply;
    closeDialog: () => void;
    onSuccessfulEdit?: () => void;
};

function EditTollTransactionForm({
    toll,
    closeDialog,
    onSuccessfulEdit
}: Props) {
    const [selectedEntity, setSelectedEntity] = useState<
        DocumentModel_DocumentEntityType.TRUCK | DocumentModel_DocumentEntityType.TRAILER
    >(() =>
        toll.trailerId
            ? DocumentModel_DocumentEntityType.TRAILER
            : DocumentModel_DocumentEntityType.TRUCK);

    const [updateToll, { isLoading: isUpdating }] = TollsGrpcService.useUpdateTollMutation();

    const formValues: DefaultValues = useMemo(
        () => ({
            truck_id          : toll.truckId,
            trailer_id        : toll.trailerId,
            amount            : toll.amount,
            posting_date      : toll.postingDate,
            source            : toll.source,
            toll_agency       : toll.agency,
            entry_datetime    : toll.entryDatetime,
            exit_datetime     : toll.exitDatetime,
            entry_plaza       : toll.entryPlaza,
            transponder_number: toll.transponderNumber,
            reference_id      : toll.referenceId,
            exit_plaza        : toll.exitPlaza
        }),
        [
            toll.truckId,
            toll.trailerId,
            toll.amount,
            toll.postingDate,
            toll.source,
            toll.agency,
            toll.entryDatetime,
            toll.exitDatetime,
            toll.entryPlaza,
            toll.transponderNumber,
            toll.referenceId,
            toll.exitPlaza
        ]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : formValues,
        resolver     : yupResolver<DefaultValues>(schema)
    });

    const onSubmit = (data: DefaultValues) => {
        updateToll({
            agency       : data.toll_agency,
            amount       : data.amount,
            entryDatetime: formatDateTimeToUnix(data.entry_datetime),
            entryPlaza   : data.entry_plaza,
            exitDatetime : formatDateTimeToUnix(data.exit_datetime),
            exitPlaza    : data.exit_plaza,
            plateNumber  : '',
            postingDate  : data.posting_date,
            source       : data.source,
            tollId       : toll.tollId,
            referenceId  : data.reference_id,
            settlementId : toll.settlementId,
            transponder  : data.transponder_number,
            trailerId:
                selectedEntity === DocumentModel_DocumentEntityType.TRAILER ? data.trailer_id : '',
            truckId: selectedEntity === DocumentModel_DocumentEntityType.TRUCK ? data.truck_id : ''
        })
            .unwrap()
            .then(() => {
                onSuccessfulEdit?.();
                closeDialog();
            });
    };

    return (
        <FullDialog.Form
            methods={methods}
            save={onSubmit}
        >
            <EditTollTransactionHeader
                toll_transaction_id={toll.tollId}
                setSelectedEntity={setSelectedEntity}
                selectedEntity={selectedEntity}
                onClose={closeDialog}
                isUpdating={isUpdating}
                isDirty={methods.formState.isDirty}
            />

            <FullDialog.RowContent>
                <FullDialog.ColumnContent maxWidth="700px">
                    <EditTollTransactionFields
                        control={methods.control}
                        errors={methods.formState.errors}
                        selectedEntity={selectedEntity}
                    />
                </FullDialog.ColumnContent>

                <FullDialog.ColumnContent maxWidth="100%">
                    <EditTollTransactionNote toll_transaction_id={toll.tollId} />
                </FullDialog.ColumnContent>
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}

export default EditTollTransactionForm;
