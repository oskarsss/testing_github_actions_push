import { styled } from '@mui/material/styles';

const Container = styled('div')(({ style }) => ({
    width        : '100%',
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center',
    paddingLeft  : 20,
    paddingRight : 20,
    ...style
}));

const FirstRow = styled('div')({
    height        : 72,
    width         : '100%',
    padding       : '6px 0',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 15
});

const SecondRow = styled('div')(({ theme }) => ({
    height        : 65,
    padding       : '6px 0px',
    borderTop     : `1px solid ${theme.palette.semantic.border.primary}`,
    width         : '100%',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 15,

    '.MuiDivider-root': {
        height: '36px'
    }
}));

const LeftSide = styled('div')(() => ({
    width         : '100%',
    height        : '100%',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    overflow      : 'hidden',
    gap           : 15
}));

const RightSide = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-end',
    height        : '100%',
    flexShrink    : 0,
    gap           : 15
}));

const HeaderComponents = {
    Container,
    FirstRow,
    SecondRow,
    LeftSide,
    RightSide
};

export default HeaderComponents;
