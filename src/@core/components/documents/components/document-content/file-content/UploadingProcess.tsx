import { Fade, styled } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { DOCUMENT_FADE_TIMEOUT } from '@/@core/components/documents/config';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const DocumentUploaded = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',
    width         : '100%',
    height        : '100%',
    background    : theme.palette.semantic.background.white,
    borderRadius  : 16
}));

const DocumentUploadedIcon = styled('div')(({ theme }) => ({
    width         : 109,
    height        : 109,
    background    : theme.palette.semantic.foreground.brand.secondary,
    borderRadius  : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    position      : 'relative',
    overflow      : 'hidden'
}));

const Loading = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    height       : '100%',
    position     : 'absolute',
    transform    : 'translate3d(0, 90%, 0)',
    animation    : 'spin 2s infinite linear',
    '& svg'      : {
        width            : 42,
        height           : 42,
        '&:first-of-type': {
            marginBottom: 40
        }
    },
    '@keyframes spin': {
        '0%': {
            transform: 'translate3d(0, 90%, 0)'
        },
        '100%': {
            transform: 'translate3d(0, -125%, 0)'
        }
    }
}));

export const Text = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    height    : 22,
    fontWeight: 500,
    fontSize  : 18,
    lineHeight: 22,
    color     : theme.palette.semantic.text.brand.primary
}));

export default function DocumentUploadingProcess() {
    const { t } = useAppTranslation('core');

    return (
        <Fade
            in
            timeout={DOCUMENT_FADE_TIMEOUT}
        >
            <DocumentUploaded>
                <DocumentUploadedIcon>
                    <Loading>
                        <ArrowUpwardOutlinedIcon color="primary" />
                        <ArrowUpwardOutlinedIcon color="primary" />
                    </Loading>
                </DocumentUploadedIcon>
                <Text sx={{ marginTop: 3 }}>{t('documents.upload_banner.loading')}</Text>
                <Box sx={{ width: '50%', marginTop: 3 }}>
                    <LinearProgress
                        sx={{
                            '&.MuiLinearProgress-root': {
                                backgroundColor: (theme) =>
                                    theme.palette.semantic.foreground.brand.secondary
                            },
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: (theme) =>
                                    theme.palette.semantic.foreground.brand.primary
                            }
                        }}
                    />
                </Box>
            </DocumentUploaded>
        </Fade>
    );
}
