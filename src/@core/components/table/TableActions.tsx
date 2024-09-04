import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import { useAppTranslation } from '@/hooks/useAppTranslation';
import TableTypes from './types';

type Props = {
    tableActionsConfig: TableTypes.TableActions;
};

export default function TableActions({ tableActionsConfig }: Props) {
    const { t } = useAppTranslation();
    const { palette } = useTheme();

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            overflow="hidden"
            height="100%"
            maxHeight={tableActionsConfig.totalSelected ? 43 : 0}
            bgcolor="semantic.foreground.brand.tertiary"
            sx={{
                transition: 'max-height 0.1s ease-in-out'
            }}
        >
            <Typography
                fontSize={16}
                fontWeight={600}
                variant="body2"
                sx={{
                    paddingX    : 2,
                    borderRadius: 1
                }}
                color={palette.semantic.text.brand.primary}
            >
                {tableActionsConfig.totalSelected} selected
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                paddingX={2}
            >
                {tableActionsConfig.customActions.length &&
                    tableActionsConfig.customActions.map((action, index) => (
                        <Tooltip
                            key={action.label}
                            placement="top"
                            disableInteractive
                            title={t(`${action.tooltip}`)}
                        >
                            <Button
                                size="small"
                                variant="text"
                                onClick={action.action}
                                startIcon={action.icon}
                            >
                                {t(`${action.label}`)}
                            </Button>
                        </Tooltip>
                    ))}
            </Stack>
        </Stack>
    );
}
