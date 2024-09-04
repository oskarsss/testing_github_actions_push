import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LeftTrailerStyled from '@/views/fleet/trailers/Details/components/Left/styled';
import CopyText from '@/@core/components/copy-text/CopyText';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    trailerTypeId: string;
};

export default function TypeBlock({ trailerTypeId }: Props) {
    const { t } = useAppTranslation();
    const trailerType = useTrailersTypesMap(trailerTypeId);

    if (!trailerType) return null;
    return (
        <CopyText text={trailerType?.name || ''}>
            <LeftStyled.IconBlock>
                <Box>
                    <LocalOfferSharpIcon color="secondary" />
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                    >
                        {t('common:type')}
                    </Typography>
                </Box>
                <LeftTrailerStyled.TypeContentStyled>
                    <LeftTrailerStyled.ImageContainer>
                        {trailerType ? getTrailerTypeIcon(trailerType.icon) : null}
                    </LeftTrailerStyled.ImageContainer>
                    <Typography variant="body2">{trailerType?.name || ''}</Typography>
                </LeftTrailerStyled.TypeContentStyled>
            </LeftStyled.IconBlock>
        </CopyText>
    );
}
