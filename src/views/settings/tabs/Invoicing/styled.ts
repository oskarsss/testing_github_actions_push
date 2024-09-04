import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import MuiTableCell from '@mui/material/TableCell';
import { LoadModel_InvoiceStatus } from '@proto/models/model_load';

type TotalFactoringCompanyBox = {
    option: LoadModel_InvoiceStatus;
};

const factoring_company_options = (mode: string) => ({
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_UNSPECIFIED]: {
        color          : mode !== 'dark' ? '#525164' : '#B3B6C2',
        backgroundColor: 'none'
    },
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_PAID]: {
        color          : mode !== 'dark' ? '#285FF6' : '#1976D2',
        backgroundColor: mode !== 'dark' ? '#F3F9FF' : '#1A2B3C'
    },
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_INVOICED]: {
        color          : mode !== 'dark' ? '#03A100' : '#388E3C',
        backgroundColor: mode !== 'dark' ? '#E4FFDD' : '#283624'
    },
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NEED_REVIEW]: {
        color          : mode !== 'dark' ? '#AE7300' : '#F57C00',
        backgroundColor: mode !== 'dark' ? '#FFF5D1' : '#62421b'
    },
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_REJECTED]: {
        color          : mode !== 'dark' ? '#CB281A' : '#D32F2F',
        backgroundColor: mode !== 'dark' ? '#FFF5F5' : '#3f262c'
    },
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NOT_INVOICED]: {
        color          : mode !== 'dark' ? '#CB281A' : '#D32F2F',
        backgroundColor: mode !== 'dark' ? '#FFF5F5' : '#3f262c'
    },
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_DETENTION_REQUESTED]: {
        color          : mode !== 'dark' ? '#CB281A' : '#D32F2F',
        backgroundColor: mode !== 'dark' ? '#FFF5F5' : '#3f262c'
    }
});

type Color = 'common' | 'invoiced' | 'need_review' | 'rejected';
type ColorTableText = {
    color: Color;
};
const color_text_options = (mode: string) => ({
    common     : mode === 'light' ? '#525164' : '#B3B6C2',
    invoiced   : mode === 'light' ? '#095A38' : '#0D8F5F',
    rejected   : mode === 'light' ? '#5C1017' : '#D32F2F',
    need_review: mode === 'light' ? '#BC8700' : '#FFB300'
});

export const TotalFactoringCompanyBox = styled(Box)<TotalFactoringCompanyBox>(
    ({
        option,
        theme
    }) => {
        const additional = factoring_company_options(theme.palette.mode)[option];

        return {
            borderRadius   : '8px',
            width          : '120px',
            border         : `1px solid ${theme.palette.semantic.border.secondary}`,
            padding        : '12px 12px 18px 12px',
            display        : 'flex',
            alignItems     : 'center',
            height         : '120px',
            justifyContent : 'center',
            backgroundColor: additional.backgroundColor,
            '& .total-text': {
                color: additional.color
            }
        };
    }
);
export const TableCell = styled(MuiTableCell)({
    minWidth: '100px',
    padding : '10px 0',
    align   : 'left'
});

export const ColorTableText = styled(Typography)<ColorTableText>(({
    color,
    theme
}) => ({
    fontSize  : '14px',
    fontWeight: 700,
    variant   : 'h5',
    color     : color_text_options(theme.palette.mode)[color as Color]
}));
