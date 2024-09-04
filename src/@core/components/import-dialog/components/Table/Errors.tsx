import Import from '@/store/import/types';
import { styled } from '@mui/material/styles';

const Container = styled('div')(() => ({
    h5: {
        margin      : 0,
        marginBottom: 5,
        fontSize    : 18
    },
    p: {
        margin  : 0,
        fontSize: 14
    }
}));

type Props = {
    errors: Import.RowType['errors'];
};
export default function Errors({ errors }: Props) {
    return errors.map(({
        value,
        label,
        description
    }) => (
        <Container key={value}>
            <h5>{label}</h5>
            <p>{description}</p>
        </Container>
    ));
}
