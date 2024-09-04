import { memo } from 'react';
import { ServiceLogItemModel_WarrantyCoverage } from '@proto/models/model_service_log_item';
import { Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    warrantyCoverage: ServiceLogItemModel_WarrantyCoverage;
};

function Warranty({ warrantyCoverage }: Props) {
    const { t } = useAppTranslation();
    const isItemCovered = warrantyCoverage === ServiceLogItemModel_WarrantyCoverage.COVERED;

    return (
        <Stack
            direction="row"
            gap="4px"
            width="fit-content"
            height="20px"
            borderRadius="5px"
            justifyContent="center"
            alignItems="center"
            padding="0 6px"
            bgcolor={({ palette }) =>
                palette.utility.foreground[isItemCovered ? 'blue_dark' : 'gray'].secondary}
        >
            {isItemCovered ? (
                <CheckCircleIcon
                    sx={{
                        fontSize: '16px',
                        fill    : ({ palette }) => palette.utility.foreground.blue_dark.primary
                    }}
                />
            ) : (
                <CancelSharpIcon
                    sx={{
                        fontSize: '16px',
                        fill    : ({ palette }) => palette.utility.foreground.gray.primary
                    }}
                />
            )}

            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={500}
                color={({ palette }) => palette.utility.text[isItemCovered ? 'blue_dark' : 'gray']}
            >
                {t(`maintenance:service_logs.common.${isItemCovered ? 'covered' : 'not_covered'}`)}
            </Typography>
        </Stack>
    );
}

export default memo(Warranty);
