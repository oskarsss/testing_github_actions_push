import React, { memo, useCallback, useEffect } from 'react';
import { LoadDraftModel_Status } from '@proto/models/model_load_draft';
import { Stack } from '@mui/material';
import DraftsTypes from '@/store/drafts/types';
import { useAppSelector } from '@/store/hooks';
import { DraftSelectedDraftIdSelector } from '@/store/drafts/selectors';
import _ from 'lodash';
import moment from 'moment-timezone';
import { LoadDraftUpdateReply } from '@proto/load_drafts';
import FastOverlayScrollBar from '@/@core/ui-kits/basic/fast-overlay-scrollbar/FastOverlayScrollBar';
import DraftDropzone from '../draft-dropzone/DraftDropzone';
import Document from '../draft-document/Document';

import RateConfirmation from '../rate-confirmation/RateConfirmation';
import ClientFields from './client-fields/ClientFields';
import LoadFields from './load-fields/LoadFields';
import ExtractLoading from './extract-progress/ExtractLoading';
import StopsFields from './stops-fields/StopsFields';
import InvoicingFields from './invoicing-fields/InvoicingFields';
import { useDraftFormContext } from '../Draft';
import Commodities from './commodities-fields';

type Props = {
    draftStatus: LoadDraftModel_Status;
    loadDraftFields?: DraftsTypes.Fields;
    updateDraftHandler: (value: DraftsTypes.UpdateDraftRequest) => Promise<LoadDraftUpdateReply>;
};

function DraftFormContainer({
    draftStatus,
    loadDraftFields,
    updateDraftHandler
}: Props) {
    const selectedDraftId = useAppSelector(DraftSelectedDraftIdSelector);
    const {
        watch,
        setValue
    } = useDraftFormContext();

    const extraSave = useCallback(
        async (value: Partial<DraftsTypes.Fields>) => {
            if (!loadDraftFields) return;
            if (_.isEqual(value, loadDraftFields)) return;
            if (draftStatus === LoadDraftModel_Status.EXTRACTING) return;
            const formattedStops =
                value.stops?.map((stop) => ({
                    ...stop,
                    appointmentStartAt: stop.appointmentStartAt
                        ? moment(stop.appointmentStartAt).format('YYYY-MM-DD HH:mm:ss')
                        : stop.appointmentStartAt,
                    appointmentEndAt: stop.appointmentEndAt
                        ? moment(stop.appointmentEndAt).format('YYYY-MM-DD HH:mm:ss')
                        : stop.appointmentEndAt
                })) || [];
            const response = await updateDraftHandler({
                loadDraftId: selectedDraftId,
                fields     : {
                    ...loadDraftFields,
                    ...{
                        ...value,
                        stops: formattedStops
                    }
                }
            });
            if (!response.geodata) return;
            setValue('loadedMiles', response.geodata.loadedMiles);
            [...response.geodata.distances, 0].forEach((distance, idx) => {
                setValue(`stops.${idx}.distanceToNextStop`, Math.round(distance ?? 0));
            });
        },
        [loadDraftFields, draftStatus, updateDraftHandler, selectedDraftId, setValue]
    );

    useEffect(() => {
        const subscription = watch((value) => {
            extraSave(value as DraftsTypes.Fields);
        });
        return () => subscription.unsubscribe();
    }, [watch, extraSave]);

    return (
        <DraftDropzone>
            <Stack
                width="100%"
                height="100%"
                direction="row"
                spacing={2}
                padding="32px 32px 0"
                justifyContent="space-between"
                sx={{ background: (theme) => theme.palette.semantic.background.secondary }}
            >
                <Stack
                    direction="column"
                    flex="1 1 100%"
                    overflow="hidden"
                    maxWidth="900px"
                >
                    {draftStatus === LoadDraftModel_Status.EXTRACTING ? (
                        <ExtractLoading />
                    ) : (
                        <FastOverlayScrollBar>
                            <RateConfirmation />
                            <ClientFields />
                            <LoadFields />
                            <StopsFields />
                            <InvoicingFields />
                            <Commodities />
                        </FastOverlayScrollBar>
                    )}
                </Stack>
                <Stack flex="1 1 100%">
                    <Document />
                </Stack>
            </Stack>
        </DraftDropzone>
    );
}

export default memo(DraftFormContainer);
