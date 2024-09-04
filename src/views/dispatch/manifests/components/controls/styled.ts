import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const Container = styled(Stack)({
    flexDirection : 'row',
    justifyContent: 'space-between',
    flex          : '1 1 100%',
    height        : 38,
    alignItems    : 'center',

    '[aria-label="route-button"]': {
        opacity   : 0,
        transition: 'opacity 0.3s ease'
    },
    ':hover': {
        '[aria-label="route-button"]': {
            opacity: 1
        }
    }
});

const ControlsStyled = {
    Container
};

export default ControlsStyled;
