/* eslint-disable max-len */

import ManifestsTypes from '@/store/dispatch/manifests/types';
import ManifestTooltipStyled from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/styled';
import { Typography } from '@mui/material';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import ManifestTooltipHeaderNextStop from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/Manifest/components/manifest-tooltip/ManifestTooltipHeaderNextStop';

type Props = {
    manifestFriendlyId: number | string;
    nextStop?: ManifestsTypes.AnyPreparedStop;
    gross?: string;
    totalMiles?: string;
    rpm?: string;
    manifestStatus: ManifestModel_Status;
    manifestId: string;
    truckId: string;
};

export default function ManifestTooltipHeader({
    manifestFriendlyId,
    nextStop,
    gross,
    totalMiles,
    rpm,
    manifestStatus,
    manifestId,
    truckId
}: Props) {
    return (
        <ManifestTooltipStyled.Row>
            <ManifestTooltipStyled.RowWrap>
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight={1.4}
                    color={(theme) => theme.palette.semantic.text.primary}
                    mr="4px"
                >
                    {`M-${manifestFriendlyId}`}
                </Typography>
                <ManifestStatusChipSelect
                    status={manifestStatus}
                    manifestId={manifestId}
                    size="small"
                    show_arrow={false}
                    is_changing={false}
                />
                {nextStop && (
                    <ManifestTooltipHeaderNextStop
                        nextStop={nextStop}
                        truckId={truckId}
                    />
                )}
            </ManifestTooltipStyled.RowWrap>

            <ManifestTooltipStyled.RowWrap>
                {gross && (
                    <ManifestTooltipStyled.Text textColor="primary">
                        {gross}
                    </ManifestTooltipStyled.Text>
                )}
                {gross && rpm && (
                    <ManifestTooltipStyled.Text textColor="disabled">|</ManifestTooltipStyled.Text>
                )}
                {rpm && (
                    <ManifestTooltipStyled.Text textColor="secondary">
                        {rpm}
                    </ManifestTooltipStyled.Text>
                )}
                {totalMiles && (
                    <ManifestTooltipStyled.Text textColor="disabled">|</ManifestTooltipStyled.Text>
                )}
                {totalMiles && (
                    <ManifestTooltipStyled.Text textColor="secondary">
                        {totalMiles}
                    </ManifestTooltipStyled.Text>
                )}
            </ManifestTooltipStyled.RowWrap>
        </ManifestTooltipStyled.Row>
    );
}
