import { memo, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAppSelector } from '@/store/hooks';
import VectorIcons from '@/@core/icons/vector_icons';
import TextField from '@mui/material/TextField';
import infoSectionsConfig from './info-sections-config';

function Details() {
    const { t } = useAppTranslation();
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);

    const detailsInfo = useMemo(
        () => infoSectionsConfig.getDetailsInfo(selectedServiceLog, t),
        [selectedServiceLog, t]
    );

    return (
        <Stack gap="12px">
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                <VectorIcons.FullDialogIcons.ContactInfoIcon
                    sx={{
                        fontSize: '24px',
                        color   : ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {t('maintenance:service_logs.panel.sections.details.title')}
                </Typography>
            </Stack>

            <Stack
                padding="16px"
                gap="12px"
                bgcolor="semantic.foreground.white.tertiary"
                borderRadius="8px"
            >
                {detailsInfo.map((item) => (
                    <Stack
                        key={item.key}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            lineHeight="22px"
                        >
                            {t(item.label)}
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={500}
                            lineHeight="22px"
                            color="semantic.text.secondary"
                        >
                            {item.value}
                        </Typography>
                    </Stack>
                ))}

                <TextField
                    label={t('fields:note.label')}
                    placeholder={t('fields:note.placeholder')}
                    variant="filled"
                    value={selectedServiceLog?.description || ''}
                    multiline
                    sx={{ pointerEvents: 'none' }}
                    InputProps={{
                        readOnly: true
                    }}
                />
            </Stack>
        </Stack>
    );
}

export default memo(Details);
