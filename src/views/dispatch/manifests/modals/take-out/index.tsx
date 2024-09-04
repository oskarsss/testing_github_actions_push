/* eslint-disable react/jsx-props-no-multi-spaces */
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import AeroSwitch from '@/@core/ui-kits/basic/aero-switch/AeroSwitch';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestStopTakeoutRequest } from '@proto/manifest_stops';
import ManifestSelect from '@/@core/fields/select/manifests-select';
import openNewWindow from '@/utils/open-new-window';
import WarningAlert from '../../../../../@core/ui-kits/basic/warning-alert/WarningAlert';
import ManifestsModalsIcons from '../icons';

export type TakeOutStop = { type: ManifestsTypes.OriginType; id: string; loadId: string };

type Props = {
    manifestId: string;
    stopsList: TakeOutStop[];
    onSuccessTakeOutStops?: () => void;
};

export const useTakeOutStopsDialog = hookFabric(TakeOutStops, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        turnOffCloseButton
        {...props}
    />
));

type FormValues = {
    manifestId: string;
    truckId: string;
};

function TakeOutStops({
    manifestId,
    stopsList,
    onSuccessTakeOutStops
}: Props) {
    const dialog = useTakeOutStopsDialog(true);
    const [separate, setSeparate] = useState(false);
    const [takeOut, { isLoading }] = ManifestStopsGrpcService.useTakeoutStopsMutation();
    const [takeOutSeparate, { isLoading: separateIsLoading }] =
        ManifestStopsGrpcService.useTakeoutStopsSeparateMutation();

    const methods = useForm({
        defaultValues: {
            manifestId: '',
            driverId  : '',
            truckId   : ''
        }
    });

    const submit = async (data: FormValues) => {
        const stops = stopsList.map((stop): ManifestStopTakeoutRequest['stops'][0] => ({
            loadId        : stop.loadId,
            loadStopId    : stop.id,
            manifestStopId: stop.id
        }));

        if (separate) {
            try {
                const response = await takeOutSeparate({
                    fromManifestId: manifestId,
                    stops
                }).unwrap();
                onSuccessTakeOutStops?.();
                openNewWindow(`dispatch/manifests/${response.newManifestId}`);
                dialog.close();
            } catch (error) {
                console.error('Error while taking out stops', error);
            }
            return;
        }

        try {
            await takeOut({
                fromManifestId: manifestId,
                toManifestId  : data.manifestId,
                stops
            }).unwrap();
            onSuccessTakeOutStops?.();
            openNewWindow(`dispatch/manifests/${data.manifestId}`);
            dialog.close();
        } catch (error) {
            console.error('Error while taking out stops', error);
        }
    };

    const watchedTruckId = methods.watch('truckId');

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title="modals:manifests.take_out.title">
                <AeroSwitch
                    isChecked={separate}
                    label="modals:manifests.take_out.switch"
                    onChange={(_, checked) => {
                        setSeparate(checked);
                    }}
                />
            </DialogComponents.Header>
            <DialogComponents.Fields rowSpacing={4}>
                {separate && (
                    <DialogComponents.Field xs={12}>
                        <WarningAlert text="modals:manifests.take_out.warning" />
                    </DialogComponents.Field>
                )}

                <DialogComponents.SectionTitle
                    startIcon={<ManifestsModalsIcons.Truck color="primary" />}
                    title="modals:manifests.sections.truck"
                />
                <DialogComponents.Field xs={12}>
                    <TruckSelect
                        control={methods.control}
                        name="truckId"
                        required={!separate}
                        disabled={separate}
                    />
                </DialogComponents.Field>

                <DialogComponents.SectionTitle
                    startIcon={<ManifestsModalsIcons.Manifest color="primary" />}
                    title="modals:manifests.sections.manifest"
                />
                <DialogComponents.Field xs={12}>
                    <ManifestSelect
                        control={methods.control}
                        label="core:selects.manifest"
                        name="manifestId"
                        skipFetch={!watchedTruckId}
                        disabled={separate}
                        skipManifestId={manifestId}
                        manifestSelectFilters={{
                            truckIds: [watchedTruckId]
                        }}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={separate ? false : !methods.formState.isDirty}
                    text="common:button.confirm"
                    loading={isLoading || separateIsLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
