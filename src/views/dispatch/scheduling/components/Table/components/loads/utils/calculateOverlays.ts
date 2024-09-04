/* eslint-disable no-plusplus */
import {
    OverlayParams,
    Params,
    PositionType
} from '@/views/dispatch/scheduling/components/Table/types';

export default function calculateOverlays(Rows: Params[][]) {
    const overlays: OverlayParams[] = [];
    for (let i = 1; i < Rows.length; i++) {
        const currentParams = Rows[i];
        currentParams.forEach((params) => {
            const { left } = params.position;
            const paramsRight = left + params.width;
            Rows.slice(0, i)
                .flat()
                .forEach((prev_params) => {
                    if (params.id === prev_params.id) return;
                    const { left: prev_params_left } = prev_params.position;
                    const prev_params_right = prev_params_left + prev_params.width;
                    if (left < prev_params_right && paramsRight > prev_params_left) {
                        const positionOverlay: PositionType = { left: 0, right: null };
                        const leftOverlay = left < prev_params_left ? prev_params_left : left;
                        const rightOverlay =
                            paramsRight < prev_params_right ? paramsRight : prev_params_right;
                        positionOverlay.left = leftOverlay;
                        const widthOverlay = rightOverlay - leftOverlay;

                        const existingOverlayIndex = overlays.findIndex(
                            (overlay) =>
                                overlay.index_row === i &&
                                overlay.positionOverlay.left === leftOverlay
                        );
                        if (existingOverlayIndex !== -1) {
                            overlays[existingOverlayIndex].widthOverlay = Math.max(
                                widthOverlay,
                                overlays[existingOverlayIndex].widthOverlay
                            );
                        } else {
                            overlays.push({
                                index_row: i,
                                positionOverlay,
                                widthOverlay
                            });
                        }
                    }
                });
        });
    }
    return overlays;
}
