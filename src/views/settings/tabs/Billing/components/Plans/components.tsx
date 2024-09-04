import { Stack, styled, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Container = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    alignItems     : 'center',
    justifyContent : 'center',
    position       : 'relative',
    overflow       : 'hidden',
    height         : '200px',
    gap            : '4px',
    backgroundColor: theme.palette.semantic.background.white,
    borderRadius   : '12px',
    padding        : '32px',
    color          : theme.palette.semantic.text.secondary,
    boxShadow      : '4px 4px 16px 0px rgba(117, 135, 170, 0.20)'
}));

const Title = styled(Typography)({
    fontWeight: 600,
    fontSize  : '20px',
    textAlign : 'center',
    whiteSpace: 'nowrap'
});

type AmountProps = {
    amount: number;
    active: boolean;
    interval: string;
};

const Amount = ({
    amount,
    active,
    interval
}: AmountProps) => (
    <Typography
        variant="h5"
        fontWeight={600}
        style={{ fontSize: '32px' }}
        color={(theme) =>
            active
                ? theme.palette.semantic.foreground.brand.primary
                : theme.palette.semantic.text.primary}
        textAlign="center"
        whiteSpace="nowrap"
    >
        {`$${amount / 100}`}
        <Typography
            component="span"
            fontWeight={400}
            fontSize="16px"
            color="text.secondary"
        >
            {` / ${interval}`}
        </Typography>
    </Typography>
);

type RangeProps = {
    range: [number, number];
};

const Range = ({ range }: RangeProps) => {
    const { t } = useAppTranslation();
    return (
        <Box
            padding="4px 16px"
            borderRadius="4px"
            width="fit-content"
            sx={{ backgroundColor: ({ palette }) => palette.semantic.background.secondary }}
        >
            <Typography
                fontSize="12px"
                variant="subtitle1"
                component="p"
                fontWeight={500}
                textAlign="center"
                whiteSpace="nowrap"
                color={(theme) => theme.palette.semantic.text.secondary}
            >
                {`${range[0] >= 500 ? '500+' : range.join('-')} ${t('entity:trucks')}`}
            </Typography>
        </Box>
    );
};

const ActivePlanChip = ({ isSubscription }: { isSubscription: boolean }) => {
    const { t } = useAppTranslation('settings');
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            padding="4px 8px"
            borderRadius="4px"
            width="fit-content"
            minWidth="130px"
            gap="4px"
            position="absolute"
            top="40px"
            left="-10px"
            sx={{
                backgroundColor: ({ palette }) => palette.utility.foreground.success.secondary,
                transform      : 'rotate(-45deg)translate(-10%, 60%)',
                transformOrigin: 'bottom left'
            }}
        >
            <CheckIcon
                sx={{
                    color : ({ palette }) => palette.utility.foreground.success.primary,
                    width : '16px',
                    height: '16px'
                }}
            />
            <Typography
                fontSize="12px"
                variant="body1"
                fontWeight={500}
                color={({ palette }) => palette.utility.foreground.success.primary}
            >
                {isSubscription ? t('billing.plan.chips.current') : t('billing.plan.chips.for_you')}
            </Typography>
        </Stack>
    );
};

type PlanInfoProps = {
    subscription: boolean;
    quantity: number;
};

const PlanInfo = ({
    subscription,
    quantity
}: PlanInfoProps) => {
    const { t } = useAppTranslation('settings');

    return (
        <Tooltip
            disableInteractive
            title={t(
                subscription
                    ? 'billing.plan.info.tooltips.subscription'
                    : 'billing.plan.info.tooltips.not_subscription',
                { quantity }
            )}
        >
            <Box
                position="absolute"
                top="12px"
                right="12px"
            >
                <InfoIcon sx={{ width: '20px', height: '20px' }} />
            </Box>
        </Tooltip>
    );
};

const PlanComponents = {
    ActivePlanChip,
    Amount,
    Container,
    PlanInfo,
    Range,
    Title
};

export default PlanComponents;
