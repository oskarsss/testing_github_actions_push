import App from '@/store/app/types';

export type SelectedFilters = {
    search: string;
    page?: number;
};

export type Chip = {
    label: string;
    search: string;
};

export type SearchOptionType = {
    key: string;
    value: string;
};

export type Chips = {
    select_chip: null | Chip;
    chips: Chip[];
};

type company_id = App.Company['companyId'];
type filter_id = string | number;

export type DataLS = Record<company_id, Record<filter_id, Chips>>;
