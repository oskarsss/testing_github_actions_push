import { memo, type MouseEvent } from 'react';
import ListItem from '@mui/material/ListItem';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

export const NoOptionsText = styled('div')({
    cursor    : 'pointer',
    display   : 'flex',
    alignItems: 'center',
    gap       : 4,
    flexWrap  : 'wrap',
    fontWeight: 500
});

type Props = {
    onAdd?: (event: MouseEvent<HTMLElement>) => void;
    noOptionsText: IntlMessageKey;
};

function EmptyListItem({
    onAdd,
    noOptionsText
}: Props) {
    const { t } = useAppTranslation();

    return (
        <ListItem
            onClick={onAdd}
            onKeyDown={(e) => e.stopPropagation()}
            sx={{
                ...(onAdd && {
                    color    : ({ palette }) => palette.semantic.text.brand.primary,
                    '&:hover': {
                        background: ({ palette }) => palette.semantic.background.secondary
                    }
                })
            }}
        >
            <NoOptionsText>
                {onAdd && <AddIcon sx={{ fontSize: '18px' }} />}

                {t(noOptionsText)}
            </NoOptionsText>
        </ListItem>
    );
}

export default memo(EmptyListItem);
