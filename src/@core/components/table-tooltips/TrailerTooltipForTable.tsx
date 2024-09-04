import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import TableTooltip from '@/@core/components/table-tooltips/ui-elements/TableTooltip';
import TooltipStyled from '@/@core/components/table-tooltips/ui-elements/TableTooltip.styled';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';

type TitleProps = {
    trailer: TrailerModel_Trailer;
    trailerType?: TrailerTypesGetReply_TrailerType;
};

const Title = ({
    trailer,
    trailerType
}: TitleProps) => (
    <>
        {trailer.year} {trailer.make} {trailer.model} | {trailerType?.name || '-'}
        {trailerType ? getTrailerTypeIcon(trailerType.icon) : null}
    </>
);

type TooltipDriverTrailerProps = {
    trailer_id: string;
};

export default function TrailerTooltipForTable({ trailer_id }: TooltipDriverTrailerProps) {
    const trailersMap = useTrailersMap();
    const trailersTypeMap = useTrailersTypesMap();

    const trailer = trailersMap[trailer_id];
    const trailerType = trailersTypeMap[trailer?.trailerTypeId || ''];
    const title = trailer ? (
        <Title
            trailer={trailer}
            trailerType={trailerType}
        />
    ) : undefined;

    return (
        <TableTooltip title={title}>
            <TooltipStyled.ImageWrapper>
                {trailer?.trailerTypeId ? getTrailerTypeIcon(trailerType?.icon || 0) : null}
            </TooltipStyled.ImageWrapper>
            <TooltipStyled.Span style={{ marginLeft: '5px' }}>
                {trailer?.referenceId?.substr(0, 6)}
            </TooltipStyled.Span>
        </TableTooltip>
    );
}
