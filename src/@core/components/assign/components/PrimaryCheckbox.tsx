import FormControlLabel from '@mui/material/FormControlLabel';
import { memo, ChangeEvent } from 'react';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PrimaryCheckbox = ({
    checked,
    onChange
}: Props) => {
    const { t } = useAppTranslation();
    return (
        <FormControlLabel
            control={(
                <Checkbox
                    onChange={onChange}
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            )}
            label={`${t('core:assign_menu.primary_checkbox')}:`}
            labelPlacement="start"
            sx={{ gap: '6px', mb: '4px' }}
        />
    );
};

export default memo(PrimaryCheckbox);
