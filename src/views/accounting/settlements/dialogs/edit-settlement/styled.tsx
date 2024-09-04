import { Stack, Typography, styled, IconButton } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Wrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    padding        : '15px 20px',
    flexBasis      : '1900px',
    flexShrink     : 1,
    boxSizing      : 'border-box',
    gap            : '16px',
    backgroundColor: theme.palette.semantic.background.secondary
}));

const Column = styled('div')<{ flexGrow?: CSSProperties['flexGrow'] }>(({ flexGrow = 1 }) => ({
    display      : 'flex',
    flexBasis    : '300px',
    flexGrow,
    flexDirection: 'column',
    alignItems   : 'center',
    borderRadius : '8px',
    width        : '100%',
    gap          : '16px'
}));

const Row = styled('div')<{
    grow?: CSSProperties['flexGrow'];
}>(({
    theme,
    grow = 1
}) => ({
    display        : 'flex',
    flexDirection  : 'column',
    flexGrow       : grow,
    width          : '100%',
    borderRadius   : '8px',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    gap            : '16px',
    padding        : '16px'
}));

const SectionHeaderText = styled(Typography)(({ theme }) => ({
    fontSize  : '18px',
    fontWeight: 700,
    lineHeight: '28px',
    color     : theme.palette.semantic.text.primary
}));

type SectionHeaderProps = PropsWithChildren<{
    title: IntlMessageKey;
    Icon: React.ReactNode;
}>;

const SectionHeader = ({
    children,
    Icon,
    title
}: SectionHeaderProps) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="30px"
            maxHeight="30px"
            minHeight="30px"
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                {Icon}
                <SectionHeaderText>{t(title)}</SectionHeaderText>
            </Stack>
            {children}
        </Stack>
    );
};

const TableSection = styled('div')(() => ({
    marginTop: '10px'
}));

const IconButtonDelete = styled(IconButton)(({ theme }) => ({
    position       : 'absolute',
    right          : '0',
    top            : '0',
    opacity        : 0,
    padding        : '1px',
    borderRadius   : '0px 0px 0px 4px',
    width          : '14px',
    height         : '14px',
    transition     : 'opacity 0.2s',
    backgroundColor: theme.palette.utility.foreground.error.secondary,

    '&:hover': {
        backgroundColor: theme.palette.utility.foreground.error.secondary,
        opacity        : 0.8
    },

    svg: {
        fontSize: '14px',
        color   : theme.palette.utility.foreground.error.primary
    }
}));

const EditSettlement = {
    Wrapper,
    Column,
    Row,
    TableSection,
    SectionHeader,
    IconButtonDelete
};

export default EditSettlement;
