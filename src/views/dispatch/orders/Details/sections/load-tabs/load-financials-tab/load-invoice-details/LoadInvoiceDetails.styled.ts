/* eslint-disable import/no-named-as-default-member */
import { styled } from '@mui/material/styles';
import ButtonMui from '@mui/material/Button';
import LoadDetailsViewStyled from '../../../../LoadDetailsView.styled';

type ContainerProps = {
    invoiceItemsLength: number;
};

const Container = styled(LoadDetailsViewStyled.FlexContainer)<ContainerProps>(
    ({ invoiceItemsLength }) => ({
        gap           : '4px',
        justifyContent: invoiceItemsLength === 0 ? 'center' : 'space-between',
        padding       : '0 0 6px 8px',
        alignItems    : 'flex-start'
    })
);

const Button = styled(ButtonMui)(({ theme }) => ({
    padding : '4px 8px',
    fontSize: '12px',
    color   : `${theme.palette.semantic.foreground.brand.primary} !important`
}));

const LoadInvoiceDetailsStyled = {
    Container,
    Button
};

export default LoadInvoiceDetailsStyled;
