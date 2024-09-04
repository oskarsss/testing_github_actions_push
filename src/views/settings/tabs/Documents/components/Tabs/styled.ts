import { styled } from '@mui/material';
import MuiBox from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

export const Box = styled(MuiBox)(() => ({
    borderBottom: 1,
    borderColor : 'divider',
    width       : '100%'
}));
export const Tabs = styled(MuiTabs)(() => ({
    height   : '40px',
    minHeight: '40px',
    maxHeight: '40px'
}));
export const Tab = styled(MuiTab)(() => ({
    height    : '40px',
    minHeight : '40px',
    maxHeight : '40px',
    fontWeight: 700
}));
