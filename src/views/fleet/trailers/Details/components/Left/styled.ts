import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const TitleStyled = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    width         : '100%'
}));

const TypeContentStyled = styled('div')({
    width         : '100%',
    display       : 'flex',
    justifyContent: 'end',
    alignItems    : 'center',
    gap           : 8
});

const ImageContainer = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center'
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    width       : 120,
    height      : 120,
    borderRadius: '8px 8px 48px 8px',
    border      : `4px solid ${theme.palette.semantic.border.primary}`,
    fontSize    : '4.5rem',
    background  : theme.palette.semantic.foreground.secondary,
    svg         : {
        width : 70,
        height: 70,
        fill  : theme.palette.semantic.text.secondary
    }
}));

const Header = styled('div')(({ theme }) => ({
    width         : '100%',
    paddingTop    : 36,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-around',
    position      : 'relative',
    '&::before'   : {
        content     : '""',
        position    : 'absolute',
        top         : 0,
        right       : 0,
        width       : '100%',
        height      : 84,
        background  : theme.palette.semantic.foreground.tertiary,
        borderRadius: '0 0 8px 8px'
    }
}));

const HeaderContentInfo = styled('div')({
    display   : 'flex',
    alignItems: 'end',
    gap       : 16,
    marginLeft: 10,
    overflow  : 'hidden',
    flex      : 4
});

const Button = styled('div')({
    width         : 48,
    minWidth      : 48,
    maxWidth      : 48,
    flex          : 1,
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 4,
    marginRight   : 10
});

const TypeIcon = styled('div')(({ theme }) => ({
    svg: {
        position    : 'absolute',
        bottom      : 0,
        right       : 0,
        width       : 32,
        height      : 32,
        borderRadius: '50%',
        background  : theme.palette.semantic.background.white
    }
}));

const LeftStyled = {
    TitleStyled,
    TypeContentStyled,
    ImageContainer,
    AvatarStyle,
    Header,
    HeaderContentInfo,
    Button,
    TypeIcon
};

export default LeftStyled;
