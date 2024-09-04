import { CircularProgress } from '@mui/material';
import AuthLoaderStyled from '@/views/auth/components/AuthLoader/styled';

export default function AuthLoader() {
    return (
        <AuthLoaderStyled.Container>
            <CircularProgress color="primary" />
        </AuthLoaderStyled.Container>
    );
}
