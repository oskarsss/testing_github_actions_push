import { styled } from '@mui/material';
import AvatarGroupMui from '@mui/material/AvatarGroup';

const AvatarGroup = styled(AvatarGroupMui)(() => ({
    cursor             : 'pointer',
    '& .MuiAvatar-root': {
        transition: 'transform 0.3s',

        '&:hover': {
            transform: 'translateY(-5px)'
        }
    }
}));

const AvatarsGroupStyled = {
    AvatarGroup
};

export default AvatarsGroupStyled;
