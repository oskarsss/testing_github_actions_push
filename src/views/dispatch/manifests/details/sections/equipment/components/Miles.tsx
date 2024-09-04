import { memo } from 'react';
import { Stack, Typography, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Distance } from '@proto/models/distance';
import { useOverrideEditLoadedMilesDialog } from '@/views/dispatch/manifests/modals/overrides/OverrideEditLoadedMiles';
import { useOverrideEditEmptyMilesDialog } from '@/views/dispatch/manifests/modals/overrides/OverrideEditEmptyMiles';

type Props = {
    manifestId: string;
    loadedDistance?: Distance;
    emptyDistance?: Distance;
};

export default function Miles({
    manifestId,
    loadedDistance,
    emptyDistance
}: Props) {
    const { t } = useAppTranslation();
    const editLoadedMilesDialog = useOverrideEditLoadedMilesDialog();
    const editEmptyMilesDialog = useOverrideEditEmptyMilesDialog();

    const openEditLoadedMilesDialog = () => {
        editLoadedMilesDialog.open({
            manifestId,
            distance: loadedDistance
        });
    };

    const openEditEmptyMilesDialog = () => {
        editEmptyMilesDialog.open({
            manifestId,
            distance: emptyDistance
        });
    };

    return (
        <Stack
            direction="row"
            marginBottom="7px"
            borderRadius="8px"
            border="1px solid"
            borderColor={({ palette }) => palette.semantic.border.secondary}
            boxShadow="0px 1px 2px 0px #1018280D"
        >
            <Stack
                padding="4px 12px"
                flex={1}
            >
                <Tooltip
                    title={t('common:button.edit')}
                    placement="top"
                    disableInteractive
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name   : 'offset',
                                    options: {
                                        offset: [0, -12]
                                    }
                                }
                            ]
                        }
                    }}
                >
                    <Stack
                        onClick={openEditLoadedMilesDialog}
                        direction="row"
                        gap="4px"
                        maxWidth="fit-content"
                        sx={{
                            cursor: 'pointer'
                        }}
                        alignItems="center"
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontSize="12px"
                            fontWeight={500}
                        >
                            {t('modals:manifests.details.equipment.titles.loaded_miles')}
                        </Typography>

                        <EditIcon
                            sx={{
                                color: ({ palette }) => palette.semantic.foreground.primary,

                                fontSize: '12px'
                            }}
                        />
                    </Stack>
                </Tooltip>
                <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize="14px"
                >
                    {loadedDistance?.milesFormatted || '-'}
                </Typography>
            </Stack>

            <Stack
                padding="4px 12px"
                borderLeft="1px solid"
                sx={{
                    cursor: 'pointer'
                }}
                borderColor={({ palette }) => palette.semantic.border.secondary}
                flex={1}
            >
                <Tooltip
                    title={t('common:button.edit')}
                    placement="top"
                    disableInteractive
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name   : 'offset',
                                    options: {
                                        offset: [0, -12]
                                    }
                                }
                            ]
                        }
                    }}
                >
                    <Stack
                        onClick={openEditEmptyMilesDialog}
                        direction="row"
                        gap="4px"
                        alignItems="center"
                        maxWidth="fit-content"
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontSize="12px"
                            fontWeight={500}
                        >
                            {t('modals:manifests.details.equipment.titles.empty_miles')}
                        </Typography>

                        <EditIcon
                            sx={{
                                color: ({ palette }) => palette.semantic.foreground.primary,

                                fontSize: '12px'
                            }}
                        />
                    </Stack>
                </Tooltip>

                <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize="14px"
                >
                    {emptyDistance?.milesFormatted || '-'}
                </Typography>
            </Stack>
        </Stack>
    );
}
