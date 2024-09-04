import { IconButton } from '@/@core/fields/select/BrokerSelect/styled';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Tooltip } from '@mui/material';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    tooltipAddButton?: IntlMessageKey;
    label: string;
    addTestId?: string;
};

export default function CustomAutocompleteAddButton({
    onClick,
    tooltipAddButton,
    label,
    addTestId
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Tooltip
            title={
                tooltipAddButton
                    ? t(tooltipAddButton)
                    : t('core:selects.autocomplete.add_button.tooltip', { label })
            }
        >
            <IconButton
                size="small"
                onClick={onClick}
                onKeyDown={(e) => e.stopPropagation()}
                sx={{ padding: '2px' }}
                {...applyTestId(addTestId)}
            >
                <AddCircleOutlineOutlinedIcon color="primary" />
            </IconButton>
        </Tooltip>
    );
}
