import { memo } from 'react';
import { ServiceLogItemModel_WarrantyCoverage } from '@proto/models/model_service_log_item';
import { Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

type Props = {
    warrantyCoverage: ServiceLogItemModel_WarrantyCoverage;
};

function Warranty({ warrantyCoverage }: Props) {
    const isItemCovered = warrantyCoverage === ServiceLogItemModel_WarrantyCoverage.COVERED;

    return (
        <Stack
            width="28px"
            height="20px"
            borderRadius="5px"
            justifyContent="center"
            alignItems="center"
            padding="0 6px"
            margin="0 auto"
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
        </Stack>
    );
}

export default memo(Warranty);
