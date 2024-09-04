import { MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isDisabledEdit: boolean;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function EditButton({
    onClick,
    isDisabledEdit
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Tooltip title={t('common:button.edit')}>
            <IconButton
                onClick={onClick}
                disabled={isDisabledEdit}
                className="EditSettlementEditButton"
                sx={{
                    position  : 'absolute',
                    visibility: 'hidden',
                    right     : '4px',
                    top       : '5%',
                    width     : '30px',
                    height    : '30px',
                    padding   : '4px !important'
                }}
            >
                <EditIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
}
