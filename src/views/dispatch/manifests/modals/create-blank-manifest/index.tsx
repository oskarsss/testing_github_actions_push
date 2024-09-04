import FullDialog from '@/@core/ui-kits/full-dialog';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { CurrencyCode } from '@proto/models/currency_code';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import openNewTab from '@/utils/openNewTab';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    ContextSelectedStop,
    DefaultStops,
    FormValues,
    schema
} from '@/views/dispatch/manifests/modals/create-blank-manifest/helpers';
import moment from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Fields from './components/fields/Fields';
import Map from './components/map/Map';

export const useCreateBlankManifest = hookFabric(CreateBlankManifest, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        turnOffCloseButton
        paperStyle={{
            minWidth : '1300px',
            maxHeight: '970px',
            height   : 'calc(100% - 20px)'
        }}
    />
));

function CreateBlankManifest() {
    const { t } = useAppTranslation();
    const [trigger, triggerState] = ManifestsGrpcService.useCreateBlankManifestMutation();
    const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

    const dialog = useCreateBlankManifest(true);
    const methods = useForm<FormValues>({
        defaultValues: {
            grossAmount  : '',
            grossCurrency: CurrencyCode.USD,
            stops        : DefaultStops,
            title        : ''
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dialog.confirmDialog.setDirty(methods.formState.isDirty);
    }, [methods.formState, dialog.confirmDialog]);

    const submit = async (data: FormValues) => {
        const res = await trigger({
            grossAmount  : data.grossAmount,
            grossCurrency: data.grossCurrency,
            stops        : data.stops,
            title        : data.title
        }).unwrap();

        dialog.forceClose();
        if (res.manifest) {
            openNewTab(`/dispatch/manifests/${res.manifest.manifestId}`);
        }
    };

    useEffect(() => {
        const subscription = methods.watch(({ stops }, { name }) => {
            if (
                name &&
                stops &&
                (name.includes('appointmentStartAt') || name.includes('appointmentEndAt'))
            ) {
                stops.forEach((stop, index) => {
                    if (index === 0) return;
                    const prevStop = stops[index - 1];
                    if (!prevStop?.appointmentStartAt || !stop?.appointmentStartAt) return;

                    const prevStopStartAt = moment.utc(prevStop.appointmentStartAt);
                    const currentStopStartAt = moment.utc(stop.appointmentStartAt);
                    if (prevStopStartAt.isSameOrAfter(currentStopStartAt)) {
                        methods.setError(`stops.${index}.appointmentStartAt`, {
                            type   : 'manual',
                            message: t('modals:manifests.stop.errors.stop_time_earlier_previous')
                        });
                    } else {
                        methods.clearErrors(`stops.${index}.appointmentStartAt`);
                    }
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [methods, t]);

    const contextSelectedStopValue = useMemo(
        () => ({
            selectedStopId,
            setSelectedStopId
        }),
        [selectedStopId, setSelectedStopId]
    );

    return (
        <ContextSelectedStop.Provider value={contextSelectedStopValue}>
            <FullDialog.Form
                methods={methods}
                save={submit}
            >
                <Stack
                    direction="row"
                    overflow="hidden"
                    gap={2}
                    flex="1 1 100%"
                >
                    <Stack
                        direction="column"
                        gap={2}
                        flex="1 1 100%"
                    >
                        <Stack
                            justifyContent="space-between"
                            direction="row"
                            alignItems="center"
                            paddingX="10px"
                        >
                            <FullDialog.HeaderTitle title="modals:manifests.create_blank.header.title" />
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <FullDialog.CloseButton onClose={dialog.close} />
                                <FullDialog.SaveButton
                                    isDisabled={!methods.formState.isDirty}
                                    isLoading={triggerState.isLoading}
                                    type="create"
                                />
                            </Stack>
                        </Stack>
                        <OverlayScrollbarsComponent
                            options={{
                                scrollbars: {
                                    autoHide: 'leave'
                                }
                            }}
                        >
                            <Fields />
                        </OverlayScrollbarsComponent>
                    </Stack>

                    <Stack
                        overflow="hidden"
                        flex="1 1 100%"
                    >
                        <Map />
                    </Stack>
                </Stack>
            </FullDialog.Form>
        </ContextSelectedStop.Provider>
    );
}
