import RateConfirmation from '@/views/new-loads/views/Draft/rate-confirmation/RateConfirmation';
import Stack from '@mui/material/Stack';
import { Button, Tooltip, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { useAppSelector } from '@/store/hooks';
import CardMedia from '@mui/material/CardMedia';

import { DraftSelectedDraftIdSelector } from '@/store/drafts/selectors';
import { useAppTranslation } from '@/hooks/useAppTranslation';

// @ts-ignore
import VEKTOR_DARK from '../../../../../../../public/loading_animation/LOADING_B.webm';

// @ts-ignore
import VEKTOR_LIGHT from '../../../../../../../public/loading_animation/LOADING_W.webm';

// @ts-ignore
import ROUTE_MATE_DARK from '../../../../../../../public/loading_animation/ROUTE_MATE_B.webm';

// @ts-ignore
import ROUTE_MATE_LIGHT from '../../../../../../../public/loading_animation/ROUTE_MATE_W.webm';

// @ts-ignore
import HERO_LIGHT from '../../../../../../../public/loading_animation/HERO_W.webm';

// @ts-ignore
import HERO_DARK from '../../../../../../../public/loading_animation/HERO_B.webm';

const LOADERS_CONFIG = {
    VEKTOR: {
        DARK : VEKTOR_DARK,
        LIGHT: VEKTOR_LIGHT
    },
    ROUTE_MATE: {
        DARK : ROUTE_MATE_DARK,
        LIGHT: ROUTE_MATE_LIGHT
    },
    TEST: {
        DARK : ROUTE_MATE_DARK,
        LIGHT: ROUTE_MATE_LIGHT
    },
    HERO: {
        DARK : HERO_DARK,
        LIGHT: HERO_LIGHT
    }
};

const loaders = LOADERS_CONFIG[process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN || 'VEKTOR'];

const ExtractLoading = () => {
    const { mode } = useTheme().palette;
    const { t } = useAppTranslation();
    const selected_draft_id = useAppSelector(DraftSelectedDraftIdSelector);
    const [trigger] = LoadDraftsGrpcService.useCancelExtractMutation();

    const cancelExtract = () => {
        trigger({
            loadDraftId: selected_draft_id
        });
    };

    return (
        <div
            style={{
                display      : 'flex',
                flex         : '1 1 100%',
                flexDirection: 'column',
                maxWidth     : '900px',
                width        : '100%',
                height       : '100%',
                overflow     : 'hidden'
            }}
        >
            <RateConfirmation />
            <Stack
                direction="column"
                sx={{
                    overflow: 'auto',
                    height  : '100%'
                }}
                p={2}
                alignItems="center"
                position="relative"
            >
                <CardMedia
                    component="video"
                    src={mode === 'light' ? loaders.LIGHT : loaders.DARK}
                    autoPlay
                    loop
                    muted
                    style={{
                        width : '80%',
                        height: '80%'
                    }}
                />
                <Tooltip
                    placement="top"
                    disableInteractive
                    title={t('new_loads:draft.form.tooltips.skip_loading')}
                >
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ marginTop: '20px' }}
                        onClick={cancelExtract}
                    >
                        {t('common:button.skip')}
                    </Button>
                </Tooltip>
            </Stack>
        </div>
    );
};

export default ExtractLoading;
