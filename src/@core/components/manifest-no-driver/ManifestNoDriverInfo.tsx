import { Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignDriverToManifestDialog } from '@/views/dispatch/manifests/modals/add-driver';

type Props = {
    manifestId: string;
};

export default function ManifestNoDriverInfo({ manifestId }: Props) {
    const { t } = useAppTranslation();
    const assignDriverDialog = useAssignDriverToManifestDialog();

    const handleAddDriver = () => {
        assignDriverDialog.open({
            manifestId,
            existDrivers: []
        });
    };

    return (
        <Stack
            overflow="hidden"
            flexGrow="1"
        >
            <Stack
                direction="row"
                gap="6px"
                alignItems="center"
            >
                <InfoIcon
                    sx={{ fontSize: '16px' }}
                    color="secondary"
                />

                <Typography
                    variant="body1"
                    fontSize="14px"
                    fontWeight={700}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {t('common:empty.no_driver')}
                </Typography>
            </Stack>

            <Typography
                onClick={handleAddDriver}
                variant="body1"
                fontSize="12px"
                fontWeight={500}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                color="semantic.foreground.brand.primary"
                sx={{ cursor: 'pointer' }}
            >
                {t('common:actions.assign_driver_to_manifest')}
            </Typography>
        </Stack>
    );
}
