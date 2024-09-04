/* eslint-disable import/no-named-as-default-member */
import { styled } from '@mui/material/styles';
import ButtonMui from '@mui/material/Button';
import LoadDetailsViewStyled from '../../../../LoadDetailsView.styled';

type ContainerProps = {
    driverPayLength: number;
};

const Container = styled(LoadDetailsViewStyled.FlexContainer)<ContainerProps>(
    ({ driverPayLength }) => ({
        gap           : '4px',
        padding       : '0 0 6px 8px',
        alignItems    : 'flex-start',
        justifyContent: driverPayLength === 0 ? 'center' : 'space-between'
    })
);

const Button = styled(ButtonMui)(({ theme }) => ({
    padding   : '4px 8px',
    fontSize  : '12px',
    lineHeight: '12px',
    color     : `${theme.palette.semantic.foreground.brand.primary} !important`
}));

const LoadDriverPayStyled = {
    Container,
    Button
};

export default LoadDriverPayStyled;
