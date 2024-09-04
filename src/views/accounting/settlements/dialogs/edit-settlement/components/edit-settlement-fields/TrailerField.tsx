import { TRAILER_TYPE_ICONS_LIST } from '@/@core/theme/entities/trailer/type';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import openNewWindow from '@/utils/open-new-window';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditSettlementContext } from '../../EditSettlement';

export default function TrailerField() {
    const { trailer } = useEditSettlementContext();
    const { t } = useAppTranslation();

    const trailerType = useTrailersTypesMap()[trailer?.trailerTypeId || ''];
    const onClickArrowForward = () => {
        openNewWindow(`/trailers/${trailer?.trailerId}`);
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
                padding        : '12px',
                borderRadius   : '4px',
                maxHeight      : '54px',
                height         : '100%',
                backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
            }}
        >
            <Tooltip title={trailerType ? trailerType?.name : t('common:empty.no_trailer')}>
                {trailerType && trailerType.icon ? (
                    <span
                        style={{
                            display   : 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {TRAILER_TYPE_ICONS_LIST[trailerType?.icon || 0]}
                    </span>
                ) : (
                    <DangerousOutlinedIcon
                        fontSize="medium"
                        color="disabled"
                    />
                )}
            </Tooltip>
            <Stack
                direction="column"
                justifyContent="space-between"
            >
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {t('entity:trailer')}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography
                        variant="body1"
                        fontSize="14px"
                        fontWeight={500}
                        width="max-content"
                        color={trailer ? 'semantic.text.primary' : 'semantic.text.disabled'}
                    >
                        {trailer?.referenceId ?? t('common:empty.no_trailer')}
                    </Typography>
                </Stack>
            </Stack>
            {trailer && (
                <Tooltip
                    title={t('common:tooltips.see_entity_details', {
                        entity: t('entity:trailer').toLowerCase()
                    })}
                >
                    <IconButton
                        disabled={!trailer}
                        onClick={onClickArrowForward}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
}
