import { CSSProperties, MouseEvent, useMemo, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useActiveTrailersCompanies } from '@/store/fleet/trailers/hooks';
import CustomAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomAutocomplete';
import { TestIDs } from '@/configs/tests';
import { useAddTrailerCompanyMenu } from '@/views/fleet/trailers/Table/components/TrailerCompanySelect/CompanyMenu';
import type { IntlMessageKey } from '@/@types/next-intl';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    required?: boolean;
    testOptions?: Record<string, string | undefined>;
}
export default function TrailerCompanySelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    width = '100%',
    required = false,
    testOptions = {
        inputTestID: '',
        addTestId  : ''
    }
}: Props<TFieldValues>) {
    const [entered_value, setEnteredValue] = useState<string>('');
    const addTrailerCompanyMenu = useAddTrailerCompanyMenu();
    const { companies } = useActiveTrailersCompanies();
    const {
        field: { onChange }
    } = useController({
        name,
        control
    });

    const companies_options = useMemo(
        () =>
            companies.map(({
                name,
                trailerCompanyId: id
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

    const createCompany = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>, value: string) => {
        setEnteredValue(value);
        addTrailerCompanyMenu.open({
            enteredValue: value,
            onAdded     : setCompanyId
        })(e);
    };

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            label={label}
            width={width}
            options={companies_options}
            entities_by_id={companies_by_id}
            onAdd={(e) => createCompany(e, entered_value)}
            entity="company"
            onCreate={createCompany}
            required={required}
            testOptions={{
                inputTestID : testOptions.inputTestID,
                optionTestId: TestIDs.components.select.trailerCompany.optionPrefix,
                addTestId   : testOptions.addTestId
            }}
        />
    );
}
