import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import { MouseEvent, ReactNode } from 'react';
import { Button } from '@mui/material';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    icon: ReactNode;
    title: IntlMessageKey;
    add?: (event: MouseEvent<HTMLButtonElement>) => void;
    button_text?: IntlMessageKey;
    children?: ReactNode;
};

export default function CustomEditLoadHeader({
    icon,
    title,
    add,
    button_text = 'common:button.add_item',
    children
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            spacing={3}
            justifyContent="space-between"
            marginTop={5}
        >
            <FullDialog.TableHeader
                icon={icon}
                title={title}
            />

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
                overflow="hidden"
            >
                {children}

                {add && (
                    <Button
                        variant="text"
                        color="primary"
                        onClick={add}
                        sx={{
                            maxWidth  : 'max-content',
                            width     : 'max-content',
                            flexShrink: 0
                        }}
                        startIcon={<AddIcon />}
                    >
                        {t(button_text)}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
