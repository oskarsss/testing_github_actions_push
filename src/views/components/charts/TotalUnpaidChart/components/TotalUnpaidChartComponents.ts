/* eslint-disable max-len */

import { styled } from '@mui/material/styles';
import { LoadInvoiceStatus } from '@/models/loads/load';
import { LOAD_INVOICE_STATUS_COLORS } from '@/@core/theme/entities/load/invoice_status';

const ChartContainer = styled('div')(({ theme }) => ({
    width   : '100%',
    height  : '100%',
    display : 'flex',
    margin  : 'auto',
    maxWidth: '466px',

    '.chart-tooltip:after, .chart-tooltip:before': {
        right        : '50%',
        top          : '100%',
        border       : 'solid transparent',
        content      : '""',
        height       : 0,
        width        : 0,
        position     : 'absolute',
        pointerEvents: 'none',
        transform    : 'rotate(-90deg)'
    },
    '.chart-tooltip:after': {
        borderColor     : 'rgba(0, 0, 0, 0)',
        borderRightColor: theme.palette.semantic.background.white,
        borderWidth     : '10px',
        marginBottom    : '-10px'
    },
    '.chart-tooltip:before': {
        borderColor     : 'rgba(0, 0, 0, 0)',
        borderRightColor: theme.palette.semantic.background.white,
        borderWidth     : '13px',
        marginBottom    : '-13px'
    },

    '.apexcharts-tooltip': {
        zIndex    : 5000,
        position  : 'fixed',
        overflow  : 'visible !important',
        whiteSpace: 'normal !important',
        minWidth  : '235px',
        maxWidth  : '350px',
        width     : '270px',

        '.chart-tooltip__percentage': {
            padding      : '4px 8px',
            width        : '74px',
            height       : '33px',
            borderRadius : '4px',
            fontWeight   : 600,
            fontSize     : '16px',
            lineHeight   : '157%',
            textAlign    : 'center',
            letterSpacing: '0.1px',
            textTransform: 'uppercase',
            marginTop    : '8px',

            '&.detention_requested': {
                backgroundColor:
                    theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS.detention_requested]
                        ?.secondary,
                color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS.detention_requested]
            },
            '&.need_review': {
                backgroundColor:
                    theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS.need_review]
                        ?.secondary,
                color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS.need_review]
            },
            '&.invoiced': {
                backgroundColor:
                    theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS.invoiced]
                        ?.secondary,
                color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS.invoiced]
            },
            '&.rejected': {
                backgroundColor:
                    theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS.rejected]
                        ?.secondary,
                color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS.rejected]
            },
            '&.not_invoiced': {
                backgroundColor:
                    theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS.not_invoiced]
                        ?.secondary,
                color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS.not_invoiced]
            },
            '&.paid': {
                backgroundColor:
                    theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS.paid]?.secondary,
                color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS.paid]
            }
        }
    },
    '.chart-tooltip': {
        position    : 'relative',
        background  : theme.palette.semantic.background.white,
        borderRadius: '8px',

        padding       : '16px',
        display       : 'flex',
        flexWrap      : 'wrap',
        justifyContent: 'space-between',
        alignItems    : 'center',

        '.chart-tooltip__title': {
            width        : '100%',
            fontWeight   : 600,
            fontSize     : '14px',
            lineHeight   : '143%',
            letterSpacing: '0.17px',
            color        : theme.palette.semantic.text.primary
        },

        '.chart-tooltip__amount': {
            fontWeight   : 700,
            fontSize     : '24px',
            lineHeight   : '143%',
            letterSpacing: '0.17px',
            color        : theme.palette.semantic.text.primary,
            marginRight  : '20px',
            marginTop    : '8px'
        }
    }
}));

const ListContainer = styled('ul')(({ theme }) => ({
    width         : '50%',
    listStyleType : 'none',
    flexShrink    : 0,
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'center'
}));

const ListItem = styled('li')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderBottom  : '1px solid',
    padding       : '14px 0',
    borderColor   : theme.palette.semantic.border.secondary,
    '&:last-child': {
        borderBottom: 'none'
    }
}));

const ListItemWrapper = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    '&:last-child': {
        flexWrap      : 'wrap',
        justifyContent: 'flex-end'
    }
}));

const HeaderLabel = styled('span')(({ theme }) => ({
    fontWeight   : 600,
    fontSize     : '12px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    padding      : '4px 0',
    color        : theme.palette.semantic.text.secondary
}));

type Props = {
    status: LoadInvoiceStatus;
};

const Dot = styled('span')<Props>(({
    theme,
    status
}) => ({
    display        : 'inline-block',
    width          : '16px',
    minWidth       : '16px',
    height         : '16px',
    borderRadius   : '100%',
    marginRight    : '16px',
    padding        : '4px 0',
    backgroundColor: theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS[status]]?.primary
}));

const ListItemLabel = styled('span')(({ theme }) => ({
    fontWeight   : 500,
    fontSize     : '16px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    color        : theme.palette.semantic.text.primary,
    textTransform: 'capitalize',
    paddingRight : '16px',
    padding      : '4px 0'
}));

const ListItemAmount = styled('span')(({ theme }) => ({
    fontWeight   : 700,
    fontSize     : '16px',
    lineHeight   : '143%',
    textAlign    : 'right',
    letterSpacing: '0.17px',
    padding      : '4px 0',
    color        : theme.palette.semantic.text.primary
}));

const ListItemPercentage = styled('span')<Props>(({
    theme,
    status
}) => ({
    display      : 'inline-block',
    width        : '58px',
    height       : '27px',
    padding      : '4px 6px',
    borderRadius : '80px',
    fontWeight   : 700,
    fontSize     : '12px',
    lineHeight   : '157%',
    textAlign    : 'center',
    letterSpacing: '0.1px',
    textTransform: 'uppercase',
    marginLeft   : '12px',
    backgroundColor:
        theme.palette.utility.foreground[LOAD_INVOICE_STATUS_COLORS[status]]?.secondary,
    color: theme.palette.utility.text[LOAD_INVOICE_STATUS_COLORS[status]]
}));

const TotalUnpaidChartComponents = {
    ChartContainer,
    ListContainer,
    ListItemWrapper,
    ListItemLabel,
    ListItemAmount,
    ListItemPercentage,
    Dot,
    ListItem,
    HeaderLabel
};

export default TotalUnpaidChartComponents;
