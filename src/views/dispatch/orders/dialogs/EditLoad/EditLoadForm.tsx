/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Notes from '@/@core/components/notes/Notes';
import Documents from '@/@core/components/documents/Documents';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import EditLoadFields from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/EditLoadFields';
import EditLoadStops from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadStops/EditLoadStops';
import EditLoadInvoiceItems from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadInvoiceItems/EditLoadInvoiceItems';
import EditLoadInvoicePaymentItems from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadInvoicePaymentItems/EditLoadInvoicePaymentItems';
import EditLoadHeader from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadHeader/EditLoadHeader';
import { useAppDispatch } from '@/store/hooks';
import { invalidateRetrieveSettlement } from '@/@grpcServices/services/settlements-service/settlements.service';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import { LoadData_Load } from '@proto/loads';
import EditLoadNotes from '@/views/dispatch/orders/dialogs/EditLoad/components/notes/EditLoadNotes';
import { edit_load_schema } from './schema';
import Commodities from './components/commodities';
import DriverPayItems from './components/driver-pay-items';

export type EditLoadDefaultValues = {
    note: LoadData_Load['note'];
    equipment_id: LoadData_Load['equipmentId'];
    type_id: LoadData_Load['typeId'];
    weight: LoadData_Load['weight'];
    commodity: LoadData_Load['commodity'];
};

const default_values: EditLoadDefaultValues = {
    note        : '',
    equipment_id: '',
    type_id     : '',
    weight      : 0,
    commodity   : ''
};

type Props = {
    load: LoadData_Load;
    document_id?: string;
    onSuccessfulDelete?: () => void;
    settlementsParams?: {
        settlementId: string;
        cycleId: string;
        periodId: string;
    };
};

export const useEditLoadForm = () => useFormContext<EditLoadDefaultValues>();

export default function EditLoadForm({
    load,
    document_id,
    settlementsParams,
    onSuccessfulDelete
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation('modals');
    const editLoadDialog = useEditLoadDialog(true);
    const [updateLoad, { isLoading }] = LoadsGrpcService.useUpdateLoadMutation();

    const dataValues: EditLoadDefaultValues = useMemo(
        () => ({
            note        : load.note,
            equipment_id: load.equipmentId,
            type_id     : load.typeId,
            weight      : load.weight,
            commodity   : load.commodity
        }),
        [load.note, load.equipmentId, load.typeId, load.weight, load.commodity]
    );

    const methods = useForm<EditLoadDefaultValues>({
        defaultValues: default_values,
        values       : dataValues,
        mode         : 'onChange',
        resolver     : yupResolver(edit_load_schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const invalidateSettlement = useCallback(() => {
        if (!settlementsParams) {
            return;
        }

        dispatch(invalidateRetrieveSettlement(settlementsParams.settlementId));
    }, [dispatch, settlementsParams]);

    const save = useCallback(
        async (body: EditLoadDefaultValues) =>
            updateLoad({
                loadId          : load.loadId,
                note            : body.note,
                typeId          : body.type_id,
                equipmentId     : body.equipment_id,
                weight          : body.weight,
                commodity       : body.commodity,
                driverConfirmed : load.driverConfirmed,
                shipperConfirmed: load.shipperConfirmed
            })
                .unwrap()
                .then(() => {
                    invalidateSettlement();
                }),
        [load.loadId, load.driverConfirmed, load.shipperConfirmed, updateLoad, invalidateSettlement]
    );

    useEffect(() => {
        editLoadDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [isDirty, save]);

    const notes_title = useMemo(
        () => <span>{`${t('loads.edit_load.titles.notes')} - ${load.invoiceFactoringNote}`}</span>,
        [load.invoiceFactoringNote, t]
    );

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <EditLoadHeader
                load={load}
                invalidateSettlement={invalidateSettlement}
                isMutationLoading={isLoading}
                onClose={editLoadDialog.close}
                onSuccessfulDelete={onSuccessfulDelete}
            />

            <FullDialog.RowContent width="1700px">
                <FullDialog.ScrollColumnContent maxWidth="670px">
                    <EditLoadFields
                        loadId={load.loadId}
                        dispatcherId={load.dispatcherId}
                        temperature={load.temperature}
                        referenceId={load.referenceId}
                        brokerId={load.brokerId}
                        customerId={load.customerId}
                    />
                    <EditLoadInvoiceItems
                        invalidateSettlement={invalidateSettlement}
                        load={load}
                    />
                    <EditLoadInvoicePaymentItems
                        invalidateSettlement={invalidateSettlement}
                        load={load}
                    />
                    <FullDialog.TableHeader
                        icon={<VectorIcons.NavIcons.Truck />}
                        title="modals:loads.edit_load.driver_pay_items.title"
                        noWrap
                    />
                    {load.manifests.map((manifest) => (
                        <DriverPayItems
                            key={manifest.manifestId}
                            manifest={manifest}
                            loadId={load.loadId}
                        />
                    ))}

                    <EditLoadStops
                        invalidateSettlement={invalidateSettlement}
                        load={load}
                    />
                    <Commodities load={load} />
                    <EditLoadNotes
                        loadId={load.loadId}
                        notes_title={notes_title}
                        manifests={load.manifests}
                    />
                </FullDialog.ScrollColumnContent>

                <Documents
                    entityId={load.loadId}
                    entityType={DocumentModel_DocumentEntityType.LOAD}
                    title={`'${load.referenceId}' Documents`}
                    styles={{ paddingLeft: 0 }}
                    documentId={document_id}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
