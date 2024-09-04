import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { MouseEvent } from 'react';
import { SortByOption, useSortByMenu } from '@/@core/components/sort-by-menu/SortByMenu';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { FormControl } from '@/@core/components/filters/selects-filters-group/styled';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Typography } from '@mui/material';
import createMap from '@/utils/create-map';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props<T extends { sortBy: number }> = {
    filter_id: string;
    selected_filters: T;
    options: SortByOption[];
    updateType: 'redux' | 'search';
    defaultFilters: any;
};

export default function SortByFilter<T extends { sortBy: number }>({
    filter_id,
    selected_filters,
    options,
    updateType = 'redux',
    defaultFilters
}: Props<T>) {
    const sortByMenu = useSortByMenu();
    const { t } = useAppTranslation();

    const option_by_object = createMap(options, 'id');

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const currentTargetRect = e.currentTarget.getBoundingClientRect();
        sortByMenu.open({
            filter_id,
            selected_filters,
            options,
            defaultFilters,
            updateType
        })({
            ...e,
            clientX: currentTargetRect.left,
            clientY: currentTargetRect.bottom
        });
    };

    return (
        <Fade
            in
            timeout={500}
        >
            <FormControl
                style={{
                    maxWidth: 'fit-content'
                }}
                variant="outlined"
                size="small"
            >
                <InputLabel
                    htmlFor="select-input-sort_by"
                    shrink
                >
                    {t('core:filters.labels.sort_by')}
                </InputLabel>

                <Select
                    size="small"
                    labelId="select-input-sort_by"
                    variant="outlined"
                    label={t('core:filters.labels.sort_by')}
                    value="default"
                    open={false}
                    onClick={handleClick}
                    onChange={() => {}}
                    IconComponent={KeyboardArrowDown}
                    inputProps={{
                        readOnly: true,
                        sx      : {
                            display   : 'flex',
                            alignItems: 'center',
                            gap       : '2px',
                            padding   : '0 5px'
                        }
                    }}
                >
                    <MenuItem value="default">
                        <SwapVertIcon
                            sx={{
                                fontSize: '24px !important'
                            }}
                        />

                        <Typography
                            variant="body1"
                            fontSize="14px"
                        >
                            {t(option_by_object[selected_filters.sortBy].title)}
                        </Typography>
                    </MenuItem>
                </Select>
            </FormControl>
        </Fade>
    );
}
