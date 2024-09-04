import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Box } from '@mui/material';
import { SettlementStatus } from '@/models/settlements/settlement-status';
import EditSettlementConfig from '../../../options';

type Props = {
    status: SettlementStatus;
};

const SettlementStatusItem = ({ status }: Props) => {
    const { t } = useAppTranslation();

    const optionConfig = EditSettlementConfig.statuses_options(t).find(
        (option) => option.value === status
    );

    const foregroundType = optionConfig?.foregroundType || 'gray';

    return (
        <Box
            sx={{
                padding        : '4px 6px',
                borderRadius   : '4px',
                width          : 'fit-content',
                backgroundColor: (theme) =>
                    theme.palette.utility.foreground[foregroundType].secondary,

                color: (theme) => theme.palette.utility.foreground[foregroundType].primary
            }}
        >
            {optionConfig?.label()}
        </Box>
    );
};

export default SettlementStatusItem;
