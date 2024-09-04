import { Box, Stack, Tooltip, Typography, styled } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { EditSettlementIconProps } from '../../edit-settlement-icons';
import { ChangeTabAction, TabValueState } from '../../modes/regular-modes/Tabs/tabs_config';

const LabelText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isSelectedSection'
})<{
    isSelectedSection?: boolean;
}>(({
    theme,
    isSelectedSection
}) => ({
    fontSize  : '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color     : isSelectedSection ? 'white' : theme.palette.semantic.text.secondary
}));

type OverviewItemTotalProps = PropsWithChildren<{
    totalAmount: string;
    setDivider?: boolean;
    onClick?: () => void;
    tooltip?: IntlMessageKey;
}>;

const ItemLabelTotal = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isSelectedSection'
})<{
    isSelectedSection?: boolean;
}>(({
    theme,
    isSelectedSection = false
}) => ({
    fontSize  : '14px',
    fontWeight: 600,
    lineHeight: '20px',
    color     : isSelectedSection ? 'white' : theme.palette.semantic.text.primary
}));

const Item = styled('div')<{
    direction?: CSSProperties['flexDirection'];
    grow?: CSSProperties['flexGrow'];
    smallPadding?: boolean;
}>(({
    theme,
    direction = 'row',
    smallPadding = false
}) => ({
    display      : 'flex',
    flexDirection: direction,

    // flexGrow     : grow,
    borderRadius: '8px',
    border      : `1px solid ${theme.palette.semantic.border.primary}`,
    boxShadow   : ' 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    padding     : smallPadding ? '8px' : '16px',
    gap         : '8px'
}));

const ItemTotal = ({
    totalAmount,
    children,
    setDivider = false,
    onClick,
    tooltip
}: OverviewItemTotalProps) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
                borderBottom: (theme) =>
                    setDivider ? `1px solid ${theme.palette.semantic.border.secondary} ` : 'none'
            }}
        >
            {tooltip ? (
                <Tooltip
                    title={t(tooltip)}
                    placement="top"
                >
                    <Box
                        component="span"
                        onClick={onClick}
                        sx={{
                            display       : 'flex',
                            alignItems    : 'center',
                            justifyContent: 'center',
                            cursor        : onClick ? 'pointer' : 'default'
                        }}
                    >
                        <Typography
                            variant="body1"
                            fontSize="18px"
                            fontWeight={600}
                            lineHeight="28px"
                        >
                            {totalAmount}
                        </Typography>
                        {children}
                    </Box>
                </Tooltip>
            ) : (
                <>
                    <Typography
                        variant="body1"
                        fontSize="18px"
                        fontWeight={600}
                        lineHeight="28px"
                    >
                        {totalAmount}
                    </Typography>
                    {children}
                </>
            )}
        </Stack>
    );
};

type OverviewRowProps = {
    label: IntlMessageKey;
    Icon: React.FC<EditSettlementIconProps>;
    totalAmount: string;
    labelValue?: TabValueState;
    tabValue?: TabValueState;
    handleChange?: ChangeTabAction;
    isDeduct?: boolean;
};

function RowInfo({
    label,
    Icon,
    totalAmount,
    labelValue,
    tabValue,
    handleChange,
    isDeduct
}: OverviewRowProps) {
    const { t } = useAppTranslation();
    const handleClick = (event: React.SyntheticEvent) => {
        if (handleChange && labelValue) {
            handleChange(event, labelValue);
        }
    };

    const isSelected = labelValue === tabValue && Boolean(labelValue);
    return (
        <Stack
            onClick={handleClick}
            direction="row"
            justifyContent="space-between"
            sx={{
                cursor                 : 'pointer',
                padding                : 2,
                borderRadius           : '4px',
                transition             : 'background-color 0.2s ease-in-out',
                '&.MuiStack-root:hover': {
                    backgroundColor: (theme) => theme.palette.semantic.border.secondary
                },
                ...(isSelected && {
                    // eslint-disable-next-line max-len
                    backgroundColor        : (theme) => theme.palette.semantic.foreground.brand.primary,
                    color                  : 'white',
                    '&.MuiStack-root:hover': {
                        backgroundColor: (theme) => theme.palette.semantic.background.brand
                    }
                }),
                ...(labelValue === tabValue &&
                    labelValue === 'driverRecurringTransactionsInfo' && {
                    borderRadius                  : '4px 4px 0 0',
                    '&.MuiStack-root:last-of-type': {
                        borderRadius: '0 0 4px 4px'
                    }
                })
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                sx={{
                    ...(isDeduct && {
                        width   : '100%',
                        maxWidth: '135px'
                    })
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                >
                    {Icon({ isSelected })}
                    <LabelText isSelectedSection={isSelected}>{t(label)}:</LabelText>
                </Stack>
                {isDeduct && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            borderRadius   : '4px',
                            paddingX       : '4px',
                            backgroundColor: (theme) =>
                                theme.palette.utility.foreground.blue_dark.secondary
                        }}
                    >
                        <DoneIcon
                            sx={{
                                width : '12px',
                                height: '12px',
                                // eslint-disable-next-line max-len
                                fill  : (theme) => theme.palette.utility.foreground.blue_dark.primary
                            }}
                        />
                        <Typography
                            fontSize="12px"
                            fontWeight={500}
                            about="deduct"
                            sx={{
                                color: (theme) => theme.palette.utility.foreground.blue_dark.primary
                            }}
                        >
                            {t('common:deduct')}
                        </Typography>
                    </Stack>
                )}
            </Stack>
            <ItemLabelTotal isSelectedSection={isSelected}>{totalAmount}</ItemLabelTotal>
        </Stack>
    );
}

type OverviewItemProps = PropsWithChildren<{
    label: IntlMessageKey;
    Icon: React.ReactNode;
}>;

function ItemLabel({
    Icon,
    label
}: OverviewItemProps) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            {Icon}
            <LabelText>{t(label)}:</LabelText>
        </Stack>
    );
}

const OverviewStyled = {
    ItemLabel,
    ItemTotal,
    ItemLabelTotal,
    RowInfo,
    Item
};

export default OverviewStyled;
