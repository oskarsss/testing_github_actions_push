import { IconButton } from '@/@core/fields/select/BrokerSelect/styled';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Tooltip } from '@mui/material';
import { IntlMessageKey } from '@/@types/next-intl';
import { memo, type MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    tooltipAddButton: IntlMessageKey;
};

function AddButton({
    onClick,
    tooltipAddButton
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Tooltip title={t(tooltipAddButton)}>
            <IconButton
                size="small"
                onClick={onClick}
                onKeyDown={(e) => e.stopPropagation()}
                sx={{
                    padding: '2px',
                    top    : 0
                }}
                aria-label="add_button"
            >
                <AddCircleOutlineOutlinedIcon color="primary" />
            </IconButton>
        </Tooltip>
    );
}

export default memo(AddButton);
