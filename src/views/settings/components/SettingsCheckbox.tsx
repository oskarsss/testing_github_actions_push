import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { ComponentProps } from 'react';

export default function SettingsCheckbox(props: ComponentProps<typeof Checkbox>) {
    return (
        <Checkbox
            readOnly
            {...props}
        />
    );
}
