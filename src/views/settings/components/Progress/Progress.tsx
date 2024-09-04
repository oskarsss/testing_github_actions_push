import CircularProgress from '@mui/material/CircularProgress';
import { ProgressWrap } from '@/views/settings/components/styled';

export default function Progress() {
    return (
        <ProgressWrap>
            <CircularProgress />
        </ProgressWrap>
    );
}
