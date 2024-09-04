import { CSSProperties, useState, MouseEvent, useMemo } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useActivePlatesCompanies } from '@/store/fleet/plates/hooks';
import CustomAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomAutocomplete';
import { useCompanyMenu } from '@/views/fleet/plates/menus/CompanyMenu';
import { TestIDs } from '@/configs/tests';
import type { IntlMessageKey } from '@/@types/next-intl';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    required?: boolean;
}
export default function PlateCompanySelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    width = '100%',
    required = false
}: Props<TFieldValues>) {
    const companyMenu = useCompanyMenu();

    const [entered_value, setEnteredValue] = useState<string>('');

    const {
        field: { onChange }
    } = useController({
        name,
        control
    });

    const {
        companies,
        isLoading
    } = useActivePlatesCompanies();

    const companies_options = useMemo(
        () =>
            companies.map(({
                name,
                plateCompanyId: id
            }) => ({
                id,
                name
            })),
        [companies]
    );

    const companies_by_id = useMemo(() => {
        const companies_object: OptionObjects = {};

        companies_options.forEach((company) => {
            companies_object[company.id] = company;
        });

        return companies_object;
    }, [companies]);

    const setCompanyId = (company_id: string) => {
        onChange(company_id);
        setEnteredValue('');
    };

    const createCompany = (e: MouseEvent<HTMLDivElement>, value: string) => {
        setEnteredValue(value);
        companyMenu.open({
            enteredValue: value,
            onAdded     : setCompanyId
        })(e);
    };

    const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
        companyMenu.open({
            onAdded: setCompanyId
        })(e);
    };

    return (
        <CustomAutocomplete
            control={control}
            loading={isLoading}
            name={name}
            label={label}
            width={width}
            options={companies_options}
            entities_by_id={companies_by_id}
            onAdd={onAdd}
            entity="company"
            onCreate={createCompany}
            required={required}
            testOptions={{
                inputTestID : TestIDs.pages.fleetPlates.fields.company,
                optionTestId: TestIDs.components.select.plateCompany.optionPrefix
            }}
        />
    );
}
