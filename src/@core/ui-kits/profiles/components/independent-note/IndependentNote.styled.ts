import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

const Block = styled('div')({
    minHeight   : '70px',
    marginBottom: 10
});

const Header = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    minWidth  : 150,
    gap       : 5
});

const SaveButton = styled(LoadingButton)({
    minHeight: '30px',
    padding  : '0 12px'
});

const FieldWrapper = styled('div')(({ theme }) => ({
    padding     : '0 24px',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));

const Field = styled(TextField)({
    marginTop   : 10,
    marginBottom: 10,
    borderRadius: 4,
    width       : '100%'
});

const IndependentNoteStyled = {
    Block,
    Header,
    SaveButton,
    FieldWrapper,
    Field
};

export default IndependentNoteStyled;
