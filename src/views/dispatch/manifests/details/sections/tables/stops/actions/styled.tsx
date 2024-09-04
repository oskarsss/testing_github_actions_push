import { Button, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const ActionButton = styled(Button)(() => ({
    maxHeight   : '24px',
    minHeight   : '24px',
    fontSize    : '12px',
    fontWeight  : 600,
    width       : 'min-content',
    textWrap    : 'nowrap',
    padding     : '0 10px',
    height      : '100%',
    borderRadius: '4px',

    '.MuiButton-icon': {
        marginRight: '4px',
        svg        : {
            width : '16px',
            height: '16px'
        }
    }
}));

type CancelProps = {
    onClick: (tableMode: TableMode) => void;
};

function Cancel({ onClick }: CancelProps) {
    const { t } = useAppTranslation();
    return (
        <ActionButton
            onClick={() => onClick(TableMode.NONE)}
            startIcon={<CloseIcon />}
            color="error"
            variant="outlined"
        >
            {t('common:button.cancel')}
        </ActionButton>
    );
}

const ActionsStyled = {
    Button: ActionButton,
    Cancel
};

export default ActionsStyled;
