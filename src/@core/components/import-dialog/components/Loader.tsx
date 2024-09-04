import CircularProgress from '@mui/material/CircularProgress';
import { LoaderContainer } from './styled';

export default function Loader() {
    return (
        <LoaderContainer>
            <CircularProgress color="primary" />
        </LoaderContainer>
    );
}
