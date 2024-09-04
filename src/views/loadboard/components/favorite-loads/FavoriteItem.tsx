import { useAppDispatch } from '@/store/hooks';
import { useLoadboardSelectedSearchResultsMap } from '@/store/loadboard/selectors';
import { Box, IconButton, Stack, Tooltip, Typography, createSvgIcon, styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { LoadboardActions } from '@/store/loadboard/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    resultId: string;
};

const TripInfoIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7"
        height="24"
        viewBox="0 0 7 24"
        fill="none"
    >
        <circle
            cx="3.5"
            cy="3.5"
            r="3"
            fill="white"
            stroke="#6B7789"
        />
        <line
            x1="3.5"
            y1="7"
            x2="3.5"
            y2="17"
            stroke="#6B7789"
        />
        <circle
            cx="3.5"
            cy="20.5"
            r="3.5"
            fill="#6B7789"
        />
    </svg>,
    'TripInfoIcon'
);

const Wrapper = styled(Stack)(({ theme }) => ({
    padding     : theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    cursor      : 'pointer',
    maxWidth    : '150px',
    width       : '100%',
    maxHeight   : '40px',
    height      : '40px',
    minHeight   : '40px',
    border      : `1px solid ${theme.palette.semantic.border.primary}`,
    '&:hover'   : {
        border: `1px solid ${theme.palette.semantic.border.secondary}`
    }
}));

export default function FavoriteItem({ resultId }: Props) {
    const { map } = useLoadboardSelectedSearchResultsMap();
    const { t } = useAppTranslation();
    const load = map[resultId];
    const dispatch = useAppDispatch();
    const remove = () => {
        dispatch(LoadboardActions.removeFavoriteLoad({ resultId }));
    };

    return (
        <Tooltip
            disableInteractive
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: ({ palette }) => palette.semantic.background.white,
                        border         : ({ palette }) => `1px solid ${palette.semantic.border.secondary}`
                    }
                }
            }}
            title={(
                <Stack
                    direction="row"
                    alignItems="center"
                >
                    <TripInfoIcon />
                    <Box>
                        <Typography
                            variant="body2"
                            color="semantic.text.primary"
                            fontSize="12px"
                        >
                            {load?.origin?.city || '-'}, {load?.origin?.state || '-'}
                        </Typography>
                        <Typography
                            variant="body2"
                            fontSize="12px"
                            color="semantic.text.primary"
                        >
                            {load?.destination?.city || '-'}, {load?.destination?.state || '-'}
                        </Typography>
                    </Box>
                </Stack>
            )}
            placement="top"
        >
            <Wrapper
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                >
                    <TripInfoIcon />
                    <Stack
                        paddingY="4px"
                        direction="column"
                        overflow="hidden"
                    >
                        <Typography
                            noWrap
                            maxWidth="85px"
                            lineHeight="16px"
                            fontSize="12px"
                            variant="body2"
                            textOverflow="ellipsis"
                            textTransform="capitalize"
                            color="semantic.text.primary"
                        >
                            {load?.origin?.city || '-'}, {load?.origin?.state || '-'}
                        </Typography>

                        <Typography
                            noWrap
                            maxWidth="85px"
                            lineHeight="16px"
                            fontSize="12px"
                            variant="body2"
                            color="semantic.text.primary"
                            textTransform="capitalize"
                        >
                            {load?.destination?.city || '-'}, {load?.destination?.state || '-'}
                        </Typography>
                    </Stack>
                </Stack>
                <Tooltip
                    disableInteractive
                    title={t('common:button.remove')}
                    arrow
                    placement="bottom-end"
                >
                    <IconButton
                        onClick={remove}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Wrapper>
        </Tooltip>
    );
}
