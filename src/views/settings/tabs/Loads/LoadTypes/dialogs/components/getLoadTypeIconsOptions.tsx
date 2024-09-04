import type { TFunction } from '@/@types/next-intl';
import LoadTypeConfig from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/load-type-config';
import { LOAD_TYPES_ICONS } from '@/@core/theme/entities/load/load_types';
import OptionComponent from '@/@core/fields/select/components/OptionComponent';

const getLoadTypeIconsOptions = (t: TFunction) =>
    LoadTypeConfig.loadTypeIconsOptions.map(({
        value,
        label
    }) => ({
        value,
        label: () => (
            <OptionComponent
                icon={LOAD_TYPES_ICONS[value]}
                text={t(label)}
            />
        )
    }));

export default getLoadTypeIconsOptions;
