import { Stack, Tooltip, Typography, createSvgIcon, useTheme } from '@mui/material';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const EditMilesIcon = createSvgIcon(
    <svg
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.42302 2.41524L2.13117 7.70709C1.66451 8.17372 1.40104 8.43717 1.19598 8.7419C1.01409 9.01217 0.867798 9.30476 0.760709 9.61243C0.639969 9.95932 0.587289 10.3282 0.49398 10.9815L0.461431 11.2093C0.448032 11.3031 0.481025 11.3976 0.549908 11.4626C0.618791 11.5277 0.714979 11.5552 0.807852 11.5365L1.12301 11.4729C1.70998 11.3545 2.04141 11.2876 2.35264 11.1651C2.62877 11.0564 2.89119 10.9157 3.1345 10.7458C3.40875 10.5543 3.64781 10.3153 4.07122 9.89184L9.48542 4.47763L7.42302 2.41524Z"
            fill="#596372"
        />
        <path
            d="M10.3104 3.65268L11.0126 2.95047C11.5821 2.38095 11.5821 1.45759 11.0126 0.888073C10.4431 0.318558 9.5197 0.31856 8.95019 0.888074L8.24798 1.59028L10.3104 3.65268Z"
            fill="#596372"
        />
    </svg>,
    'EditMilesIcon'
);

type Props = {
    label: IntlMessageKey;
    value: number;
    onClick: () => void;
    disabled: boolean;
};

function MilesInput({
    onClick,
    value,
    label,
    disabled
}: Props) {
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    return (
        <Tooltip
            placement="top"
            disableInteractive
            disableHoverListener={disabled}
            title={!disabled ? t('common:tooltips.click_to_edit') : ''}
        >
            <Stack
                direction="column"
                maxWidth={145}
                sx={{
                    ...(!disabled && {
                        cursor: 'pointer'
                    })
                }}
                onClick={onClick}
            >
                <Stack
                    sx={{
                        border      : `1px solid ${palette.semantic.border.secondary}`,
                        borderRadius: '4px',
                        padding     : '2px 6px'
                    }}
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <Typography
                        variant="caption"
                        color={palette.semantic.text.secondary}
                        fontWeight={600}
                    >
                        {t(label)}:
                    </Typography>
                    <Typography
                        variant="caption"
                        color="#020C27"
                        fontSize="12px"
                        fontWeight={600}
                    >
                        {value}
                    </Typography>
                    {!disabled && (
                        <EditMilesIcon
                            sx={{
                                width : '12px',
                                height: '12px'
                            }}
                        />
                    )}
                </Stack>
            </Stack>
        </Tooltip>
    );
}
export default MilesInput;
