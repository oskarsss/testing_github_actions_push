/* eslint-disable max-len */

import React, { Fragment, memo, useCallback, useMemo } from 'react';
import {
    changeHeightType,
    changeLeftNoCoveredType,
    EditTimeOffType,
    OverlayParams,
    Params
} from '@/views/dispatch/scheduling/components/Table/types';
import calculateOverlays from '@/views/dispatch/scheduling/components/Table/components/loads/utils/calculateOverlays';
import { useGetParams } from '@/views/dispatch/scheduling/components/Table/components/loads/utils/hookGetParams';
import { getIndex } from '@/views/dispatch/scheduling/components/Table/components/loads/utils/getIndex';
import Scheduling from '@/store/dispatch/scheduling/types';
import TimeOff from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/TimeOff/TimeOff';
import {
    ManifestModel_Manifest,
    ManifestModel_Status,
    ManifestModel_Stop
} from '@proto/models/model_manifest';
import {
    getPrepareSchedulingStops,
    isCompletedManifest
} from '@/@grpcServices/services/manifests-service/utils';
import Manifest from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/Manifest';
import { useEditManifestDialog } from '@/views/dispatch/manifests/modals/edit-manifest/EditManifest';
import { useAppDispatch } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import { Column, LoadsContainer, Overlay, RenderContainer } from '../styled';

function selectTime(stop: ManifestModel_Stop, manifestStatus: ManifestModel_Status) {
    const manifestCompleted = isCompletedManifest(manifestStatus);
    if (stop?.loadStopId) {
        const loadStop = stop;
        return loadStop.checkedInAt && manifestCompleted
            ? loadStop.checkedInAt
            : loadStop.appointmentStartAtLocal;
    }
    if (stop?.manifestStopId) {
        const manifestStop = stop;
        return manifestStop.checkedInAt && manifestCompleted
            ? manifestStop.checkedInAt
            : manifestStop.appointmentStartAtLocal;
    }
    return '';
}

type Props = {
    widthOneMin: number;
    manifests: Scheduling.TruckManifestRow['manifests'];
    timeOffs: Scheduling.TimeOffType[];
    changeHeight: changeHeightType;
    changeLeftNoCovered: changeLeftNoCoveredType;
    covered: Scheduling.TruckManifestRow['covered'];
    openEditTimeOffDialog: EditTimeOffType;
};

const RenderItems = ({
    widthOneMin,
    manifests,
    timeOffs,
    changeHeight,
    changeLeftNoCovered,
    covered,
    openEditTimeOffDialog
}: Props) => {
    const dispatch = useAppDispatch();
    const getParams = useGetParams(widthOneMin);
    const editManifestDialog = useEditManifestDialog();

    const onOpenEditManifest = useCallback(
        (manifest: ManifestModel_Manifest) => {
            dispatch(ManifestsActions.SelectManifestById(manifest.manifestId));
            editManifestDialog.open({ manifestId: manifest.manifestId });
        },
        [dispatch, editManifestDialog]
    );

    const {
        itemsRows,
        overlays
    } = useMemo(() => {
        const itemsRows: Params[][] = [];
        let overlays: OverlayParams[] = [];

        manifests.forEach((manifest) => {
            const manifestStops = getPrepareSchedulingStops(manifest.stops);
            const firstStop = manifestStops?.[0];
            const lastStop = manifestStops[manifestStops.length - 1];

            const firstStopTime = selectTime(firstStop, manifest.status);
            const lastStopTime = selectTime(lastStop, manifest.status);

            const params = getParams({
                startAt: firstStopTime,
                endAt  : lastStopTime,
                manifest
            });

            if (!params) return;

            if (itemsRows.length === 0) {
                itemsRows.push([params]);
            } else {
                const rowIndex = getIndex(itemsRows, params);
                itemsRows[rowIndex] = itemsRows[rowIndex]
                    ? [...itemsRows[rowIndex], params]
                    : [params];
            }
        });

        timeOffs.forEach((time_off) => {
            const params = getParams({
                startAt: time_off.startAt,
                endAt  : time_off.endAt,
                time_off
            });

            if (!params) return;

            if (itemsRows.length === 0) {
                itemsRows.push([params]);
            } else {
                const rowIndex = getIndex(itemsRows, params);
                itemsRows[rowIndex] = itemsRows[rowIndex]
                    ? [...itemsRows[rowIndex], params]
                    : [params];
            }
        });

        if (itemsRows.length > 1) {
            overlays = calculateOverlays(itemsRows);
        }

        const height = itemsRows.length * 68 + (itemsRows.length - 1) * 8 + 16;
        changeHeight(height);

        return { itemsRows, overlays };
    }, [timeOffs, manifests, getParams, changeHeight]);

    if (!covered) {
        changeLeftNoCovered(itemsRows);
    }

    return (
        <RenderContainer>
            <LoadsContainer>
                {itemsRows.map((params, indexRow) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={indexRow}>
                        {indexRow > 0 && (
                            <Column style={{ height: '8px', minHeight: '8px' }}>
                                {overlays
                                    .filter(({ index_row }) => indexRow === index_row)
                                    .map((overlay, index) => (
                                        <Overlay
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                            overlayLoad={overlay}
                                        />
                                    ))}
                            </Column>
                        )}
                        <Column>
                            {params.map((row) => {
                                if (row.time_off) {
                                    return (
                                        <TimeOff
                                            {...row}
                                            key={row.time_off.id}
                                            EditTimeOff={openEditTimeOffDialog}
                                        />
                                    );
                                }
                                if (row.manifest) {
                                    return (
                                        <Manifest
                                            {...row}
                                            key={row.manifest.manifestId}
                                            openDetails={onOpenEditManifest}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </Column>
                    </Fragment>
                ))}
            </LoadsContainer>
        </RenderContainer>
    );
};

export default memo(RenderItems);
