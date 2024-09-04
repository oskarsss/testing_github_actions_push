import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { formatPhoneNumber } from '@/utils/formatting';
import { VendorModel_Vendor } from '@proto/models/model_vendor';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AssignTypes from '@/@core/components/assign/types';

type Props = AssignTypes.OptionProps<VendorModel_Vendor>;

const VendorOption = ({
    option,
    onClickOption,
    selectedOptionId,
    onKeyDown,
    setOptionRef
}: Props) => {
    const { t } = useAppTranslation('common');

    return (
        <ListItem
            tabIndex={0}
            onKeyDown={onKeyDown}
            ref={setOptionRef}
            onClick={() => onClickOption(option)}
            selected={selectedOptionId === option.vendorId}
            disabled={selectedOptionId === option.vendorId}
        >
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                width="100%"
                gap={1}
            >
                <Typography variant="body1">{option.name}</Typography>

                <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    gap={4}
                >
                    <Typography variant="caption">
                        {t('email')}: {option.email}
                    </Typography>

                    <Typography variant="caption">
                        {formatPhoneNumber(option.contactPhoneNumber) || '-'}
                    </Typography>
                </Stack>
            </Stack>
        </ListItem>
    );
};

export default VendorOption;
