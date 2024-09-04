import { styled } from '@mui/material/styles';
import MuiList from '@mui/material/List';

// eslint-disable-next-line import/prefer-default-export
export const List = styled(MuiList)(({ theme }) => ({
    gridColumn                 : 1,
    gridRow                    : 2,
    padding                    : '16px',
    backgroundColor            : theme.palette.semantic.background.secondary,
    '& .MuiListItemButton-root': {
        borderRadius: '4px',
        marginBottom: '4px',

        '&.Mui-selected': {
            fontWeight: 600
        }
    },
    '& ~ .MuiPickersLayout-contentWrapper': {
        '& .MuiDateRangeCalendar-monthContainer': {
            border                                        : 'none',
            '& .MuiDayCalendar-header .MuiTypography-root': {
                fontWeight: 700,
                color     : theme.palette.semantic.text.primary
            }
        },
        '& .MuiPickersArrowSwitcher-root': {
            backgroundColor        : theme.palette.semantic.background.secondary,
            '& .MuiTypography-root': {
                fontWeight: 600
            }
        }
    }
}));
