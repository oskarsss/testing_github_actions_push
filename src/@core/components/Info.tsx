import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface InfoProps {
    title: IntlMessageKey;
}

const Wrapper = styled('div')(() => ({
    cursor        : 'pointer',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center'
}));

const StyledTooltip = styled(({
    className,
    children,
    title,
    placement
}: TooltipProps) => (
    <Tooltip
        classes={{ popper: className }}
        title={title}
        placement={placement}
        arrow
    >
        {children}
    </Tooltip>
))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        margin         : '0 0 10px 0 !important',
        padding        : '12px !important',
        color          : theme.palette.semantic.text.secondary,
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#696969',
        boxShadow      : theme.shadows[3],
        fontSize       : 14,
        maxWidth       : 350
    },
    '& .MuiTooltip-arrow': {
        '&::before': {
            backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#696969',
            boxShadow      : theme.shadows[3]
        }
    }
}));

export default function Info({ title }: InfoProps) {
    const { t } = useAppTranslation();
    return (
        <Wrapper>
            <StyledTooltip
                title={t(title)}
                placement="top"
                arrow
            >
                <InfoIcon
                    color="action"
                    fontSize="small"
                />
            </StyledTooltip>
        </Wrapper>
    );
}
