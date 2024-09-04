import { Button, Stack, Typography } from '@mui/material';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import VectorIcons from '@/@core/icons/vector_icons';
import Link from 'next/link';
import MuiDivider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Header from '@/views/settings/tabs/Integrations/Details/components/Header/Header';

const Container = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'stretch',
    overflow     : 'hidden',
    width        : '100%',
    gap          : '16px'
});

const Wrapper = styled(Stack)(({ theme }) => ({
    flexDirection  : 'column',
    alignItems     : 'stretch',
    overflow       : 'hidden',
    borderRadius   : '8px',
    padding        : '16px',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

const DetailsContainer = ({
    children,
    provider_name
}: PropsWithChildren<{ provider_name?: string }>) => (
    <Stack
        flexDirection="column"
        overflow="hidden"
        height="100%"
        position="relative"
    >
        <Header name={provider_name || ''} />
        {children}
    </Stack>
);

function LeftWrapper({ children }: PropsWithChildren) {
    return (
        <Wrapper
            minWidth="330px"
            maxWidth="330px"
            minHeight="300px"
            overflow="auto !important"
        >
            {children}
        </Wrapper>
    );
}

function RightWrapper({
    children,
    ...rest
}: ComponentProps<typeof Wrapper>) {
    return (
        <Wrapper
            maxWidth="1100px"
            width="100%"
            flexGrow={1}
            position="relative"
            flexShrink={0}
            {...rest}
        >
            {children}
        </Wrapper>
    );
}

function CustomWrapper({
    children,
    ...rest
}: ComponentProps<typeof Wrapper>) {
    return (
        <Wrapper
            maxWidth="1100px"
            minWidth="550px"
            width="100%"
            height="80vh"
            flexShrink={2}
            position="relative"
            {...rest}
        >
            {children}
        </Wrapper>
    );
}

type LeftLinkProps = {
    href: string;
    text: string;
};

function LeftLink({
    href,
    text
}: LeftLinkProps) {
    return (
        <Link
            style={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                gap           : '4px',
                marginBottom  : '8px',
                width         : 'fit-content'
            }}
            href={href}
            target="_blank"
        >
            <Typography
                fontSize="16px"
                fontWeight={600}
                sx={{
                    color     : (theme) => theme.palette.semantic.text.primary,
                    transition: 'color 0.2s ease-in-out',

                    '&:hover': {
                        color: (theme) => theme.palette.semantic.foreground.brand.primary
                    }
                }}
            >
                {text}
            </Typography>
            <VectorIcons.Link
                sx={{ fontSize: '16px' }}
                color="primary"
            />
        </Link>
    );
}

const LeftDescription = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '12px',
    whiteSpace: 'pre-wrap'
}));

const LeftTitle = styled(Typography)(({ theme }) => ({
    fontSize    : '14px',
    fontWeight  : 500,
    marginBottom: '8px !important',
    color       : theme.palette.semantic.text.primary
}));

type LeftRowProps = {
    isLast?: boolean;
};

const LeftRow = styled(Stack)<LeftRowProps>(({ isLast = false }) => ({
    flexDirection : 'column',
    alignItems    : 'flex-start',
    justifyContent: 'flex-start',
    marginBottom  : isLast ? '0px' : '16px'
}));

const Divider = styled(MuiDivider)({
    margin: '16px 0'
});

const RightHeader = styled(Stack)({
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    marginBottom  : '16px'
});

const RightTitle = styled(Typography)(({ theme }) => ({
    fontSize  : '16px',
    fontWeight: 600,
    color     : theme.palette.semantic.text.primary
}));

const RightViewsWrapper = styled('div')({
    position: 'absolute',
    left    : 0,
    top     : 0,
    width   : '100%'
});

const RightCustomContainer = styled(Stack)({
    width       : '100%',
    height      : '100%',
    gap         : '16px',
    marginBottom: '16px',
    overflow    : 'hidden',
    paddingTop  : '40px'
});

const RowContent = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '8px'
});

const TabBadge = styled(Stack)(({ theme }) => ({
    minWidth       : '22px',
    padding        : '0px 4px',
    borderRadius   : '50%',
    color          : theme.palette.utility.foreground.error.primary,
    backgroundColor: theme.palette.utility.foreground.error.secondary
}));

const ColumnContent = styled(Stack)({
    flexDirection: 'column',
    gap          : '8px'
});

const FieldWrap = styled('div')<{ isEdit?: boolean }>(({ isEdit }) => ({
    width: '100%',

    '.MuiFilledInput-root': {
        ...(!isEdit
            ? {
                backgroundColor: 'transparent !important',

                '&:before': {
                    borderColor: 'transparent !important'
                },
                '&:after': {
                    borderColor: 'transparent !important'
                }
            }
            : {}),

        input: {
            paddingBottom: '2px',
            fontWeight   : 500,
            lineHeight   : 1.57,
            letterSpacing: '0.1px',
            fontSize     : '16px'
        }
    }
}));

const TableButtonStyled = styled(Button)<{ connected: boolean }>(({
    theme,
    connected
}) => ({
    padding      : '2px 4px',
    borderRadius : '2px',
    fontSize     : '10px',
    fontWeight   : 500,
    textTransform: 'capitalize',
    overflow     : 'hidden',
    textWrap     : 'nowrap',
    textOverflow : 'ellipsis',

    '& .MuiButton-startIcon': {
        marginLeft : 0,
        marginRight: '4px'
    },

    svg: {
        width : '16px',
        height: '16px'
    },

    backgroundColor: connected
        ? theme.palette.semantic.background.secondary
        : theme.palette.semantic.foreground.brand.secondary,

    '&:hover': {
        backgroundColor: connected
            ? theme.palette.semantic.background.secondary
            : theme.palette.semantic.foreground.brand.secondary
    },

    color: connected
        ? `${theme.palette.semantic.text.primary} !important`
        : `${theme.palette.semantic.foreground.brand.primary} !important`
}));

type CategoryButtonProps = {
    connected: boolean;
} & PropsWithChildren;

const TableConnectButton = ({
    connected,
    children
}: CategoryButtonProps) => (
    <TableButtonStyled
        style={{ textTransform: 'capitalize', minWidth: 'auto', overflow: 'hidden' }}
        connected={connected}
        color="primary"
        startIcon={
            connected ? (
                <VectorIcons.Link
                    sx={{ fontSize: '16px' }}
                    color="primary"
                />
            ) : (
                <AddIcon />
            )
        }
    >
        {children}
    </TableButtonStyled>
);

const IntegrationDetailsComponents = {
    Container,
    Wrapper,
    Divider,
    RowContent,
    ColumnContent,
    TabBadge,
    TableConnectButton,
    DetailsContainer,
    Left: {
        Wrapper    : LeftWrapper,
        Link       : LeftLink,
        Row        : LeftRow,
        Title      : LeftTitle,
        Description: LeftDescription
    },
    Right: {
        Wrapper        : RightWrapper,
        Header         : RightHeader,
        Title          : RightTitle,
        ViewsWrapper   : RightViewsWrapper,
        CustomContainer: RightCustomContainer,
        FieldWrap,
        CustomWrapper
    }
};

export default IntegrationDetailsComponents;
