import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiLoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { TabPanel as MUITabPanel } from '@mui/lab';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import Grid from '@mui/material/Grid';

const Wrapper = styled(MuiBox)(() => ({
    marginTop     : 0,
    height        : '100%',
    width         : '100%',
    overflow      : 'hidden',
    position      : 'relative',
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center'
}));

const TabPanel = styled(MUITabPanel)(() => ({
    width     : '100%',
    maxWidth  : '850px',
    height    : '100%',
    paddingTop: 0,
    overflowX : 'auto',
    overflowY : 'hidden'
}));

const Container = styled('div')(() => ({
    height       : '100%',
    display      : 'flex',
    flexDirection: 'column',
    minWidth     : 400
}));

const Header = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    paddingTop   : 0,
    paddingLeft  : '5px',
    paddingRight : '5px',
    paddingBottom: '10px',
    overflow     : 'hidden',
    gap          : '10px',
    flexShrink   : 0
}));
const ActionsWrapper = styled(Stack)(() => ({
    flexDirection : 'row',
    justifyContent: 'flex-end',
    alignItems    : 'center',
    flexShrink    : 0
}));

const Content = styled('div')(() => ({
    height  : '100%',
    padding : 0,
    overflow: 'hidden'
}));

const Dropzone = styled('div')(() => ({
    width    : '100%',
    height   : '100%',
    overflowY: 'hidden'
}));

const Image = styled('img')(() => ({
    width: '100%'
}));

const UploadContainer = styled('div')<{ isDragActive: boolean }>(({
    theme,
    isDragActive
}) => ({
    width          : '100%',
    height         : '100%',
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'center',
    alignItems     : 'center',
    borderRadius   : '15px',
    padding        : '15px',
    backgroundColor: isDragActive
        ? theme.palette.semantic.foreground.brand.tertiary
        : 'transparent',
    border: isDragActive
        ? `2px solid ${theme.palette.semantic.border.brand.primary}`
        : `2px dashed ${theme.palette.semantic.border.secondary}`,

    transition: '0.15s',
    cursor    : 'pointer',
    button    : {
        boxShadow : 'none',
        marginTop : 10,
        fontWeight: 600,
        svg       : {
            marginLeft: 2
        },
        span: {
            marginTop: 0
        }
    },
    span: {
        textAlign: 'center',
        textWrap : 'pretty'
    }
}));

const RotateButton = styled(MuiLoadingButton)(() => ({
    width       : '40px',
    minWidth    : '40px',
    borderRadius: '50%'
}));

const DocTypeTitle = styled(Typography)(() => ({
    fontSize  : '22px',
    fontWeight: 600,
    whiteSpace: 'nowrap'
}));

const ButtonsWrapper = styled(Stack)(() => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center'
}));

export const Fields = ({ children }: PropsWithChildren) => (
    <Grid
        container
        overflow="hidden"
        columnSpacing={1}
        rowSpacing={1}
    >
        {children}
    </Grid>
);

export const Field = ({
    children,
    xs = 6
}: PropsWithChildren<{ xs?: number }>) => (
    <Grid
        item
        xs={xs}
    >
        {children}
    </Grid>
);

const DocumentsComponents = {
    Wrapper,
    DocTypeTitle,
    TabPanel,
    Container,
    Header,
    ActionsWrapper,
    Content,
    Dropzone,
    Image,
    UploadContainer,
    RotateButton,
    ButtonsWrapper,
    Fields,
    Field
};

export default DocumentsComponents;
