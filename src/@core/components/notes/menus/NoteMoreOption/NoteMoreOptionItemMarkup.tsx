import { memo, ReactNode, CSSProperties } from 'react';
import { Stack } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    icon: ReactNode;
    text: IntlMessageKey;
    text_color?: CSSProperties['color'];
    button_key_text: 'E' | 'delete';
    onAction: () => void;
};

function NoteMoreOptionItemMarkup({
    icon,
    text,
    text_color,
    button_key_text,
    onAction
}: Props) {
    const { t } = useAppTranslation();
    return (
        <MenuItem
            sx={{
                height        : '25px',
                padding       : '0 6px',
                alignItems    : 'center',
                justifyContent: 'space-between',
                gap           : '12px'
            }}
            onClick={onAction}
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="4px"
            >
                <ListItemIcon
                    sx={{
                        minWidth   : 'auto !important',
                        marginRight: 0
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    sx={{
                        span: {
                            fontSize  : '12px',
                            fontWeight: 500,
                            ...(text_color && { color: text_color })
                        }
                    }}
                >
                    {t(text)}
                </ListItemText>
            </Stack>

            <Typography
                variant="body2"
                color="#E3E4EB"
                fontSize="10px"
                lineHeight="11px"
                fontWeight={500}
                padding="1px 4px"
                borderRadius="4px"
                bgcolor="#575868"
            >
                {button_key_text}
            </Typography>
        </MenuItem>
    );
}

export default memo(NoteMoreOptionItemMarkup);
