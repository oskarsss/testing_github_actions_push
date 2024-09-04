import { Fade } from '@mui/material';
import { CyclePaper } from '@/views/settings/components/styled';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TypeHeader from './Header/Header';
import Info from './Info/Info';
import Table from './Table/TypeTable';

type Props = {
    type: SettlementsTypes.RevenueTypes.RevenueType;
};
export default function Type({ type }: Props) {
    return (
        <Fade
            in
            timeout={1000}
        >
            <CyclePaper
                elevation={0}
                sx={{
                    '&+&': {
                        marginTop: '40px !important'
                    }
                }}
            >
                <TypeHeader type={type} />
                <Info type={type} />
                <Table
                    items={type.items}
                    query_id={type.revenueTypeId}
                />
            </CyclePaper>
        </Fade>
    );
}
