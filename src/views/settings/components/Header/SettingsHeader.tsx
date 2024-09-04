import React, { PropsWithChildren, ReactElement } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Title } from '@/views/settings/components/styled';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = PropsWithChildren<{
    title: string | IntlMessageKey | ReactElement;
    icon?: JSX.Element;
    onClick?: () => void;
    text_button?: IntlMessageKey;
    children_left_side?: React.ReactNode;
}>;
export default function SettingsHeader({
    title,
    icon,
    onClick,
    text_button = 'common:button.add',
    children,
    children_left_side
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            width="100%"
            height="40px"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
            zIndex={1}
        >
            <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={3}
                sx={{
                    svg: {
                        fill: ({ palette }) => palette.semantic.foreground.primary
                    }
                }}
            >
                {icon}
                <Title>{typeof title === 'string' ? t(title) : title}</Title>
                {children_left_side}
            </Stack>
            <Stack
                direction="row"
                spacing={2}
            >
                {children}
                {onClick && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<AddIcon />}
                        sx={{ width: 'max-content' }}
                        onClick={onClick}
                    >
                        {t(text_button)}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
