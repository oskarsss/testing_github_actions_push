import { styled } from '@mui/material/styles';
import { StyledPaper } from '@/views/settings/components/styled';
import { CircularProgress } from '@mui/material';

const Container = styled(StyledPaper)({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    padding       : '4px 16px',
    borderRadius  : '12px',
    position      : 'relative',
    width         : 'calc(50% - 8px)',
    height        : '75px'
});

const LeftWrapper = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    flexWrap      : 'wrap'
});

const ChartWrapper = styled('div')({
    position   : 'relative',
    width      : '44px',
    height     : '44px',
    marginRight: '16px'
});

const ChartIcon = styled('div')({
    width    : '24px',
    height   : '24px',
    position : 'absolute',
    top      : '50%',
    left     : '50%',
    transform: 'translate(-50%, -50%)',
    fill     : '#bdc7d2',
    svg      : {
        width : '24px',
        height: '24px'
    }
});

const Title = styled('p')(({ theme }) => ({
    marginBottom : '4px',
    fontSize     : '12px',
    lineHeight   : 1.57,
    letterSpacing: '0.1px',
    whiteSpace   : 'nowrap',
    color        : theme.palette.semantic.text.secondary
}));
const Description = styled('p')({
    fontWeight   : 500,
    lineHeight   : 1.57,
    letterSpacing: '0.1px',
    whiteSpace   : 'nowrap'
});

const Progress = styled(CircularProgress)({
    '&:before': {
        content     : '""',
        position    : 'absolute',
        top         : '-1px',
        left        : '-1px',
        width       : '46px',
        height      : '46px',
        borderRadius: '50%',
        border      : '6px solid #f4f5fa',
        zIndex      : -2
    }
});

const ConnectedItemComponents = {
    Container,
    LeftWrapper,
    Title,
    Description,
    Chart: {
        Wrapper: ChartWrapper,
        Icon   : ChartIcon,
        Progress
    }
};

export default ConnectedItemComponents;
