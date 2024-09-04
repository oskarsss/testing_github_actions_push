import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { BoxShadow } from 'mdi-material-ui';

const Container = styled('div')({
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'stretch',
    justifyContent: 'space-between',
    flexShrink    : 0,
    maxWidth      : '27%',
    minWidth      : '27%',
    gap           : '5px'
});

const LoadInfoWrapper = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'stretch',
    width        : '100%'
}));

const LoadInfoItem = styled('div')<{ isClickable?: boolean }>(({
    isClickable,
    theme
}) => ({
    display   : 'flex',
    alignItems: 'center',
    gap       : '6px',
    minHeight : '35px',
    ...(isClickable && {
        cursor    : 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover' : {
            transition: 'padding 0.2s ease-in-out',
            p         : {
                color: theme.palette.semantic.text.brand.primary
            },
            fill: `${theme.palette.semantic.foreground.brand.primary} !important`,

            path: {
                fill: theme.palette.semantic.foreground.brand.primary
            }

            // boxShadow : `inset 0px -1.5px 0px 0px ${theme.palette.semantic.border.secondary}`,

            // padding        : '0 6px',
            // backgroundColor: theme.palette.semantic.border.secondary
        }
    })
}));

const LoadInfoRow = styled('div')(({ theme }) => ({
    display       : 'flex',
    gap           : 'inherit',
    justifyContent: 'space-between',
    flex          : '1 1 0',
    overflow      : 'hidden'
}));

const LoadInfoIconWrapper = styled('div')(({ theme }) => ({
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

const LoadInfoItemTitle = styled('p', {
    label: 'LoadInfoItemTitle'
})(({ theme }) => ({
    fontSize  : '14px',
    fontWeight: 600,
    lineHeight: 1.43,
    margin    : 0,
    color     : theme.palette.semantic.text.primary,
    height    : '25px',
    display   : 'flex',
    alignItems: 'center'
}));

type LoadInfoItemValueProps = {
    color?: 'primary' | 'secondary' | 'disabled';
    textWrap?: 'balance' | 'nowrap';
    fontWeight?: 400 | 500 | 600 | 700;
};

const LoadInfoItemValue = styled('div')<LoadInfoItemValueProps>(
    ({
        theme,
        color = 'secondary',
        textWrap = 'balance',
        fontWeight = 600
    }) => ({
        fontSize    : '12px',
        fontWeight,
        lineHeight  : 1.43,
        color       : theme.palette.semantic.text[color],
        textAlign   : 'end',
        textWrap,
        overflow    : 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace  : 'nowrap'
    })
);

const LoadInfoItemBadge = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    alignItems     : 'center',
    justifyContent : 'space-between',
    gap            : '4px',
    height         : '25px',
    overflow       : 'hidden',
    padding        : '0 6px',
    borderRadius   : '24px',
    backgroundColor: theme.palette.semantic.background.secondary,
    textWrap       : 'nowrap'
}));

const LoadInfoItemAvatar = styled(Avatar)({
    width   : 18,
    height  : 18,
    fontSize: 10
});

const PaymentWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    width          : '100%',
    borderRadius   : '8px',
    backgroundColor: theme.palette.semantic.foreground.brand.primary,
    overflow       : 'hidden'
}));

const PaymentTitle = styled('p')({
    color        : '#CBD1FF',
    fontSize     : '12px',
    fontWeight   : 500,
    lineHeight   : 1.3,
    letterSpacing: '-0.24px',
    margin       : 0
});

const PaymentTotal = styled('p')({
    color        : '#FFFFFF',
    fontSize     : '24px',
    fontWeight   : 600,
    lineHeight   : 1.3,
    letterSpacing: '-0.44px',
    margin       : 0,
    cursor       : 'pointer'
});

type PaymentItemProps = {
    isRPM?: boolean;
};

const PaymentItem = styled('div')<PaymentItemProps>(({
    theme,
    isRPM = false
}) => ({
    position     : 'relative',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '2px',
    padding      : '8px 12px',
    height       : '65px',
    flex         : isRPM ? '2 1 0' : '3 1 0',
    background   : isRPM ? '#FFFFFF2B' : 'transparent',
    borderLeft   : isRPM ? `1px solid ${theme.palette.semantic.border.brand.tertiary}` : undefined
}));

const LoadCharacteristicsStyled = {
    Container,
    LoadInfoWrapper,
    LoadInfoItem,
    LoadInfoIconWrapper,
    LoadInfoItemTitle,
    LoadInfoItemValue,
    LoadInfoItemBadge,
    LoadInfoItemAvatar,
    LoadInfoRow,
    PaymentWrapper,
    PaymentItem,
    PaymentTotal,
    PaymentTitle
};

export default LoadCharacteristicsStyled;
