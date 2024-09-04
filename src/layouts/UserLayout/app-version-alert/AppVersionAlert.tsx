import { useAppSelector } from '@/store/hooks';
import { Alert, AlertTitle, Stack, Typography, Zoom } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const LS_APP_VERSION = 'app_version';

export default function AppVersionAlert() {
    const actualVersion = useAppSelector((state) => state.app.currentAppVersion);

    const currentVersion = localStorage.getItem(LS_APP_VERSION);

    const { t } = useAppTranslation();

    const isNotEqualVersions = actualVersion?.toString() !== currentVersion;

    const refreshHandler = () => {
        if (actualVersion) localStorage.setItem(LS_APP_VERSION, actualVersion?.toString());
        window.location.reload();
    };

    useEffect(() => {
        if (!currentVersion && actualVersion) {
            localStorage.setItem(LS_APP_VERSION, actualVersion.toString());
        }
    }, [currentVersion]);

    useEffect(() => {
        const onRefresh = () => {
            if (actualVersion) localStorage.setItem(LS_APP_VERSION, actualVersion?.toString());
        };

        window.addEventListener('beforeunload', onRefresh);
        return () => {
            window.removeEventListener('beforeunload', onRefresh);
        };
    }, [actualVersion]);

    if (!actualVersion) return null;

    return (
        <Zoom
            in={isNotEqualVersions}
            style={{ transitionDelay: isNotEqualVersions ? '500ms' : '0ms' }}
            timeout={500}
        >
            <Alert
                severity="info"
                icon={false}
                onClick={refreshHandler}
                variant="filled"
                sx={{
                    position                         : 'absolute',
                    zIndex                           : 9999,
                    top                              : 40,
                    right                            : 30,
                    maxWidth                         : '600px',
                    minWidth                         : '600px',
                    animation                        : 'right ease 0.5s',
                    cursor                           : 'pointer',
                    '&:hover .app-version-alert-text': {
                        textDecoration: 'underline'
                    }
                }}
            >
                <AlertTitle
                    sx={{
                        color: 'white'
                    }}
                >
                    {`🚀 ${t('app_version_alert.title')} 🚀`}
                </AlertTitle>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography
                        className="app-version-alert-text"
                        color="#fff"
                        fontWeight={500}
                    >
                        {t('app_version_alert.description')}
                    </Typography>
                </Stack>
            </Alert>
        </Zoom>
    );
}
