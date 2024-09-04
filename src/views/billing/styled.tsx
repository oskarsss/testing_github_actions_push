import { styled } from '@mui/material';
import { CSSProperties } from 'react';
import MuiCheckbox from '@mui/material/Checkbox';

export const CheckboxStyleCell: CSSProperties = {
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
    padding       : 0
};

const Checkbox = styled(MuiCheckbox)({
    padding        : 0,
    width          : '100%',
    height         : '100%',
    borderRadius   : 0,
    backgroundColor: 'transparent !important'
});

const BillingComponents = {
    Checkbox
};

export default BillingComponents;
