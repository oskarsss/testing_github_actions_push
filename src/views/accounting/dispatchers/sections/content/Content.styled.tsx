import { styled } from '@mui/material';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    '& .ps__rail-y': {
        width: '6px !important'
    },
    '& .ps__thumb-y': {
        width       : '4px !important',
        right       : '1px !important',
        borderRadius: '16px'
    },
    '& .ps__rail-x': {
        height: '6px !important'
    },
    '& .ps__thumb-x': {
        height      : '4px !important',
        bottom      : '1px !important',
        borderRadius: '16px'
    }
});

const ContentStyled = {
    PerfectScrollbar
};

export default ContentStyled;
