import { LoadModel_Type_Icon } from '@proto/models/model_load';
import * as yup from 'yup';
import type { IntlMessageKey } from '@/@types/next-intl';

export type DefaultValue = {
    name: string;
    code: string;
    icon: LoadModel_Type_Icon;
};

const defaultValues: DefaultValue = {
    name: '',
    code: '',
    icon: LoadModel_Type_Icon.LOAD_TYPE_ICON_DEFAULT
};

const schema: yup.ObjectSchema<DefaultValue> = yup.object().shape({
    code: yup.string().required(),
    name: yup.string().required(),
    icon: yup.number<LoadModel_Type_Icon>().required()
});

type Option = {
    value: LoadModel_Type_Icon;
    label: IntlMessageKey;
};

const loadTypeIconsOptions: Option[] = [
    {
        value: LoadModel_Type_Icon.LOAD_TYPE_ICON_DEFAULT,
        label: 'state_info:loads.load_types.icon.default'
    },
    {
        value: LoadModel_Type_Icon.LOAD_TYPE_ICON_FULL_TRUCK,
        label: 'state_info:loads.load_types.icon.full_truck'
    },
    {
        value: LoadModel_Type_Icon.LOAD_TYPE_ICON_LESS_THAN_TRUCK,
        label: 'state_info:loads.load_types.icon.less_than_truck'
    }
];

const LoadTypeConfig = {
    defaultValues,
    loadTypeIconsOptions,
    schema
};

export default LoadTypeConfig;
export type LoadTypeDefaultValue = DefaultValue;
