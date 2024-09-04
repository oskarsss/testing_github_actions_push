import { memo, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    Chip,
    ChipsWrapper,
    MenuWrap,
    Wrap
} from '@/@core/components/search/search-autocomplete/styled';
import useAnchorMenu from '@/hooks/useAnchorMenu';
import MenuComponents from '@/@core/ui-kits/menus';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Chips, Chip as ChipType } from './type';

const CHOPS_LIMIT = 1;

export type Props = {
    value: Chips;
    onSelectChip: (value: Chips) => void;
    onDeleteAll: () => void;
};

const ChipComponent = ({
    value,
    onSelectChip,
    onDeleteAll
}: Props) => {
    const {
        add,
        onClose,
        anchorMenu
    } = useAnchorMenu();

    const { t } = useAppTranslation();

    const {
        chips,
        select_chip
    } = value;

    const handlerSelectChip = (property: ChipType) => () => {
        let new_select_chip = null;
        const new_chips_arr = [...chips];

        // eslint-disable-next-line no-empty
        if (select_chip && select_chip.label === property.label) {
        } else {
            new_select_chip = property;
        }

        const new_chips = {
            select_chip: new_select_chip,
            chips      : new_chips_arr
        };
        onSelectChip(new_chips);
    };

    const handlerDeleteChip = (property: ChipType) => () => {
        let new_select_chip = null;
        const new_chips_arr = [...chips];
        // eslint-disable-next-line no-empty
        if (select_chip && select_chip.label === property.label) {
        } else {
            new_select_chip = select_chip;
        }
        new_chips_arr.splice(new_chips_arr.indexOf(property), 1);

        const new_chips = {
            select_chip: new_select_chip,
            chips      : new_chips_arr
        };
        onSelectChip(new_chips);
    };

    if (chips.length === 0) {
        return null;
    }

    const filterChips = () => {
        if (chips.length <= CHOPS_LIMIT) {
            return {
                show : chips,
                other: []
            };
        }

        const selectedChip = chips.filter((el) => el.label === select_chip?.label);
        if (selectedChip.length === 0) {
            return {
                show : chips.slice(0, CHOPS_LIMIT),
                other: chips.slice(CHOPS_LIMIT)
            };
        }

        const indexSelectedChip = chips.indexOf(selectedChip[0]);
        if (indexSelectedChip < CHOPS_LIMIT) {
            return {
                show : chips.slice(0, CHOPS_LIMIT),
                other: chips.slice(CHOPS_LIMIT)
            };
        }

        const noSelectedChips = chips.filter((el) => el.label !== select_chip?.label);

        onSelectChip({
            select_chip: selectedChip[0],
            chips      : [...selectedChip, ...noSelectedChips]
        });

        return {
            show : [...selectedChip, ...noSelectedChips.slice(0, CHOPS_LIMIT - 1)],
            other: noSelectedChips.slice(CHOPS_LIMIT - 1)
        };
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const AllChips = ({ onClose }: { onClose: () => void }) => {
        const onClick = (chip: ChipType) => () => {
            handlerSelectChip(chip)();
            onClose();
        };
        const onDelete = (chip: ChipType) => () => {
            handlerDeleteChip(chip)();
            onClose();
        };

        return (
            <MenuWrap>
                {filterChips().other.map((chip, index) => (
                    <Tooltip
                        arrow
                        title={chip.label}
                        key={chip.search || index}
                    >
                        <Chip
                            label={chip.label}
                            onClick={onClick(chip)}
                            onDelete={onDelete(chip)}
                            selected={!!select_chip && select_chip.label === chip.label}
                            className="chip"
                        />
                    </Tooltip>
                ))}
            </MenuWrap>
        );
    };

    const showMore = (event: MouseEvent<HTMLButtonElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        add({
            ...event,
            clientY: bounds.bottom + 15,
            clientX: bounds.right - 214
        });
    };

    return (
        <ChipsWrapper>
            <Wrap>
                {filterChips().show.map((chip, index) => (
                    <Tooltip
                        arrow
                        title={chip.label}
                        key={chip.search || index}
                    >
                        <Chip
                            key={chip.search || index}
                            label={chip.label}
                            onClick={handlerSelectChip(chip)}
                            onDelete={handlerDeleteChip(chip)}
                            selected={!!select_chip && select_chip.label === chip.label}
                            className="chip"
                        />
                    </Tooltip>
                ))}
                {chips.length > CHOPS_LIMIT && (
                    <Typography
                        fontSize={14}
                        sx={{
                            color: (theme) => theme.palette.semantic.text.secondary
                        }}
                    >
                        {`+${chips.length - CHOPS_LIMIT}`}
                    </Typography>
                )}
            </Wrap>
            {chips.length > 1 && (
                <Stack
                    overflow="hidden"
                    flexDirection="row"
                    flexShrink={0}
                >
                    <Tooltip title={t('core:search.autocomplete.ship.tooltips.delete_all')}>
                        <IconButton
                            aria-label="delete"
                            sx={{ padding: '2px' }}
                            onClick={onDeleteAll}
                        >
                            <DeleteForeverIcon
                                sx={{
                                    color: (theme) => theme.palette.semantic.foreground.primary
                                }}
                            />
                        </IconButton>
                    </Tooltip>

                    {chips.length > CHOPS_LIMIT && (
                        <Tooltip title={t('core:search.autocomplete.ship.tooltips.show_more')}>
                            <IconButton
                                aria-label="more"
                                sx={{ padding: '2px' }}
                                onClick={showMore}
                            >
                                <ArrowDropDownIcon
                                    sx={{
                                        color: (theme) => theme.palette.semantic.foreground.primary
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            )}

            <MenuComponents.MenuWrapper
                anchorEl={anchorMenu.anchorEl || undefined}
                anchorPosition={anchorMenu.anchorPosition}
                onClose={onClose}
                open={!!anchorMenu.anchorEl}
            >
                <AllChips onClose={onClose} />
            </MenuComponents.MenuWrapper>
        </ChipsWrapper>
    );
};

export default memo(ChipComponent);
