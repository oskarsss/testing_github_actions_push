import { MenuItem, Stack, Typography } from '@mui/material';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { memo, useMemo } from 'react';
import { SortByOption } from '@/@core/components/sort-by-menu/SortByMenu';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    option: SortByOption;
    sortBy: number;
    onClick: (option_id: number) => void;
};

const SortByMenuItem = ({
    option,
    sortBy,
    onClick
}: Props) => {
    const { t } = useAppTranslation();
    const is_item_selected = useMemo(() => sortBy === option.id, [option.id, sortBy]);

    return (
        <MenuItem
            key={option.id}
            onClick={() => onClick(option.id)}
            sx={{
                ...(is_item_selected && {
                    display   : 'flex',
                    alignItems: 'start',
                    gap       : '6px'
                })
            }}
        >
            {is_item_selected ? (
                <DoneSharpIcon
                    sx={(theme) => ({ color: theme.palette.semantic.text.brand.primary })}
                />
            ) : (
                <div style={{ width: '30px' }} />
            )}
            <Stack flexDirection="column">
                <Typography
                    variant="body1"
                    sx={(theme) => ({
                        color: is_item_selected
                            ? theme.palette.semantic.text.brand.primary
                            : theme.palette.semantic.text.secondary
                    })}
                >
                    {t(option.title)}
                </Typography>

                <Typography
                    variant="body2"
                    sx={(theme) => ({
                        color: is_item_selected
                            ? theme.palette.semantic.text.brand.primary
                            : theme.palette.semantic.text.secondary
                    })}
                >
                    {t(option.description)}
                </Typography>
            </Stack>
        </MenuItem>
    );
};

export default memo(SortByMenuItem);
