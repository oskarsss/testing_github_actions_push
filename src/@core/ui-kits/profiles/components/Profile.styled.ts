import { Grid, styled } from '@mui/material';

const Container = styled(Grid)(({ theme }) => ({
    height        : '100%',
    display       : 'flex',
    justifyContent: 'space-between',
    overflow      : 'hidden',
    gap           : theme.spacing(5),
    background    : theme.palette.semantic.background.secondary
}));

const Profile = {
    Container
};

export default Profile;
