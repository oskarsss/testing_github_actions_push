import { styled } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
import MuiTableHead from '@mui/material/TableHead';

export const Title = styled('h4')({
    fontWeight: 600,
    fontSize  : '24px',
    lineHeight: 1.33,
    margin    : '0 0 10px'
});

export const SubTitle = styled('p')(({ theme }) => ({
    fontSize    : '14px',
    color       : theme.palette.semantic.text.secondary,
    marginBottom: '5px'
}));

export const Form = styled('form')({
    display  : 'flex',
    flexWrap : 'wrap',
    rowGap   : '20px',
    columnGap: '10px'
});

export const ProgressWrap = styled('div')({
    position : 'absolute',
    top      : '50%',
    left     : '50%',
    transform: 'translate(-50%, -50%)'
});

export const SectionWrap = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    width        : '100%',
    gap          : 5,
    height       : 'auto'
});

type Wrapper = {
    withBorder?: boolean;
};

export const Wrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'withBorder'
})<Wrapper>(({
    theme,
    withBorder = false
}) => ({
    position     : 'relative',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '20px',
    overflow     : 'hidden',
    flexShrink   : 1,
    width        : '100%',
    height       : '100%',
    padding      : '30px',
    borderRadius : '16px',

    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    border         : withBorder ? `1px solid ${theme.palette.semantic.border.secondary}` : '',
    boxShadow      : 'rgba(0, 0, 0, 0.04) 10px 0px 30px 0px',

    // transition opacity and small slide up
    animation: 'slide-down 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',

    '@keyframes slide-down': {
        '0%': {
            marginTop: '8px',
            opacity  : 0
        },
        '100%': {
            marginTop: 0,
            opacity  : 1
        }
    }
}));
type StyledPaper = {
    width?: string;
    height?: string;
};

type StyledPaperProps = {
    isHover?: boolean;
};
export const StyledPaper = styled(Paper)<StyledPaperProps>(({
    theme,
    isHover
}) => ({
    border      : `1px solid ${theme.palette.mode === 'light' ? '#E7EEF6' : '#2D3748'}`,
    borderRadius: '12px',
    boxShadow   : `4px 4px 16px ${
        theme.palette.mode === 'light' ? 'rgba(117, 135, 170, 0.12)' : 'rgba(0, 0, 0, 0.25)'
    }`,
    height : '120px',
    display: 'flex',
    width  : 'max-content',

    ...(isHover
        ? {
            cursor    : 'pointer',
            transition: 'background-color 0.3s',
            '&:hover' : {
                backgroundColor: theme.palette.semantic.background.secondary
            }
        }
        : {})
}));
export const SecondSubtitle = styled(Typography)(() => ({
    fontSize     : '12px',
    fontWeight   : 700,
    variant      : 'subtitle1',
    marginTop    : '4px !important',
    textTransform: 'capitalize'
}));
export const SecondTitle = styled(Typography)(() => ({
    fontSize  : '16px',
    fontWeight: 400,
    variant   : 'h6',
    marginTop : '4px !important',
    color     : '#667085'
}));
export const TotalSubtitle = styled(Typography)(() => ({
    fontSize  : '14px',
    fontWeight: 500,
    variant   : 'h5',
    textAlign : 'center'
}));
export const TableText = styled(Typography)(() => ({
    fontSize  : '14px',
    fontWeight: 500,
    variant   : 'h5'
}));
export const TotalPaper = styled(Box)<StyledPaper>(
    ({
        width = '90px',
        height = 'min-content',
        theme
    }) => ({
        borderRadius: '8px',
        height,
        width,
        border      : `1px solid ${theme.palette.semantic.border.secondary}`,
        padding     : '12px 12px 18px 12px'
    })
);
export const TableWrapper = styled('div')(({ theme }) => ({
    marginTop: '20px',
    width    : '100%',
    overflow : 'hidden',
    height   : '100%'
}));
export const CyclePaper = styled(Paper)(() => ({
    borderRadius: '16px',
    padding     : '40px',
    width       : '100%'
}));
export const TableHead = styled(MuiTableHead)(({ theme }) => {
    const color =
        theme.palette.mode === 'dark' ? theme.palette.semantic.background.white : '#FFFFFF';
    return {
        '& .MuiTableCell-root': {
            backgroundColor: color
        }
    };
});
export const DescriptionWrapper = styled(Box)(({ theme }) => ({
    padding        : '15px 40px 15px 15px',
    backgroundColor: theme.palette.semantic.background.secondary,
    borderRadius   : '12px',
    width          : '100%',
    marginTop      : '16px'
}));
export const IconBlockWrapper = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center',
    gap          : 10
}));
