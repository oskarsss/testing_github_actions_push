import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Typography, Button } from '@mui/material';

const CardContainer = styled(Stack)(({ theme }) => ({
    flexDirection  : 'column',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    borderRadius   : '8px',
    border         : `1px solid ${theme.palette.semantic.border.primary}`,
    overflow       : 'hidden'
}));

const CardRow = styled(Stack)(({ theme }) => ({
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    gap           : '1rem',
    padding       : '12px 24px',
    borderBottom  : `1px solid ${theme.palette.semantic.border.primary}`
}));

type CardTitleProps = {
    title: React.ReactNode;
    icon: React.ReactNode;
    children?: React.ReactNode;
};

function CardTitle({
    title,
    icon,
    children
}: CardTitleProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
        >
            {icon}
            <Typography
                variant="h6"
                fontWeight={600}
                fontSize="24px"
            >
                {title}
            </Typography>
            {children}
        </Stack>
    );
}

const ButtonStyled = styled(Button)(({
    theme,
    variant,
    color
}) => ({
    padding      : '0 8px',
    gap          : '2px',
    flexDirection: 'row',
    alignItems   : 'center',
    fontSize     : '12px',
    fontWeight   : 600,
    lineHeight   : 1,
    minWidth     : '24px',
    height       : '24px',
    borderRadius : '4px',
    borderColor  : theme.palette.semantic.border.secondary,
    color        : variant === 'outlined' ? theme.palette.semantic.text.brand.primary : '#fff',

    ...(variant === 'contained' && {
        boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
    }),

    ...(variant === 'outlined' &&
        color === 'primary' && {
        border: `1px solid ${theme.palette.semantic.foreground.brand.primary}`
    }),

    svg: {
        width : '16px',
        height: '16px'
    }
}));

const IconWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    overflow       : 'hidden',
    flexShrink     : 0,
    borderRadius   : '50%',
    width          : '25px',
    height         : '25px',
    backgroundColor: theme.palette.semantic.foreground.secondary,

    svg: {
        width : '14px',
        height: '14px',
        fill  : `${theme.palette.semantic.foreground.primary} !important`,

        path: {
            fill: theme.palette.semantic.foreground.primary
        }
    }
}));

const BillingLoadPanelComponents = {
    Card: {
        Container: CardContainer,
        Row      : CardRow,
        Title    : CardTitle,
        Button   : ButtonStyled,
        IconWrapper
    }
};

export default BillingLoadPanelComponents;
