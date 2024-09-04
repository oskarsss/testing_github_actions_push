import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { DocumentModel_Status } from '@proto/models/model_document';
import { DOCUMENT_STATUS_COLORS } from '@/@core/theme/entities/document/status';
import Avatar from '@mui/material/Avatar';

type ContainerProps = {
    quantityInLine: number;
};

const Container = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'quantityInLine'
})<ContainerProps>(({ quantityInLine }) => ({
    display            : 'grid',
    gridTemplateColumns: `repeat(${quantityInLine}, 1fr)`,
    alignContent       : 'start',
    gap                : '12px',
    width              : '100%'
}));

const CardContainer = styled(Stack)(({ theme }) => ({
    flexDirection  : 'column',
    justifyContent : 'space-between',
    backgroundColor: theme.palette.semantic.foreground.secondary,
    borderRadius   : '8px',
    overflow       : 'hidden',
    minHeight      : '205px',
    maxHeight      : '205px',
    cursor         : 'pointer'
}));

const CardRow = styled(Stack)({
    flexDirection : 'row',
    alignItems    : 'center',
    gap           : '4px',
    justifyContent: 'space-between',
    overflow      : 'hidden',
    flexShrink    : 0
});

const CardControllersContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '2px',

    '.MuiIconButton-root': {
        padding: '2px',

        svg: {
            fontSize: '16px',
            path    : {
                fill: theme.palette.semantic.foreground.primary
            }
        }
    }
}));

const CardBottomContainer = styled(Stack)({
    flexDirection: 'column',
    width        : '100%',
    overflow     : 'hidden',
    flexShrink   : 0,
    gap          : '6px',
    padding      : '8px'
});

const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize    : '13px',
    fontWeight  : 700,
    lineHeight  : 1.4,
    color       : theme.palette.semantic.text.primary,
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    textWrap    : 'nowrap'
}));

const CardTime = styled(Typography)(({ theme }) => ({
    fontSize    : '12px',
    fontWeight  : 600,
    lineHeight  : 1.4,
    color       : theme.palette.semantic.text.secondary,
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    textWrap    : 'nowrap'
}));

const CardPreviewDocument = styled(Box)({
    overflow: 'hidden',
    flexGrow: 1
});

const CardUploadButton = styled(LoadingButton)({
    borderRadius : '4px',
    textTransform: 'none',
    padding      : '3px 8px',
    fontSize     : '12px',
    fontWeight   : 600,
    width        : 'fit-content',
    margin       : '16px auto'
});

const CardDocumentEmptyWrapper = styled(Stack)(({ theme }) => ({
    width         : '90px',
    height        : '90px',
    borderRadius  : '50%',
    margin        : '0 auto',
    alignItems    : 'center',
    justifyContent: 'center',
    background:
        theme.palette.mode === 'light'
            ? `linear-gradient(180deg, ${theme.palette.semantic.background.secondary} 0%, #EDF0F3 100%)`
            : theme.palette.semantic.background.secondary
}));

type CardHeaderContainerProps = {
    documentStatus: DocumentModel_Status;
};

const CardHeaderContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'documentStatus'
})<CardHeaderContainerProps>(({
    theme,
    documentStatus
}) => {
    const color = DOCUMENT_STATUS_COLORS[documentStatus];
    return {
        flexDirection    : 'row',
        alignItems       : 'center',
        gap              : '4px',
        justifyContent   : 'space-between',
        overflow         : 'hidden',
        flexShrink       : 0,
        padding          : 8,
        borderBottomWidth: '0.5px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.utility.foreground[color]?.primary,
        backgroundColor  : theme.palette.utility.foreground[color]?.tertiary,

        '.MuiTypography-root': {
            color: theme.palette.utility.text[color]
        },

        svg: {
            fontSize: '16px',
            path    : {
                fill: theme.palette.utility.foreground[color]?.primary
            }
        }
    };
});

const CardPersonAvatar = styled(Avatar)({
    width   : '14px',
    height  : '14px',
    fontSize: '6px'
});

const CardPersonName = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.secondary,
    fontWeight: 600,
    fontSize  : '12px'
}));

const LoadDocumentComponents = {
    Container,
    CardHeaderContainer,
    CardBottomContainer,
    CardContainer,
    CardPreviewDocument,
    CardControllersContainer,
    CardRow,
    CardTitle,
    CardTime,
    CardUploadButton,
    CardPersonAvatar,
    CardPersonName,
    CardDocumentEmptyWrapper
};

export default LoadDocumentComponents;
