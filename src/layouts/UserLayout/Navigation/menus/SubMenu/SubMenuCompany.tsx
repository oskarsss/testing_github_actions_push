/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */

import { KeyboardEvent, memo, MutableRefObject, useCallback } from 'react';
import MenuStyled from '@/layouts/UserLayout/Navigation/menus/SubMenu/styled';
import Logo from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderLogo/Logo';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import App from '@/store/app/types';

type Props = {
    filteredCompanies: App.Company[];
    listItemRefs: MutableRefObject<(HTMLElement | null)[]>;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    selectCompanyId: string;
    company: App.Company;
    index: number;
    onChangeCompany: (companyId: string) => void;
};

function SubMenuCompany({
    filteredCompanies,
    listItemRefs,
    inputRef,
    selectCompanyId,
    company,
    index,
    onChangeCompany
}: Props) {
    const handleChangeCompany = useCallback(
        (company: App.Company) => () => {
            onChangeCompany(company.companyId);
        },
        [onChangeCompany]
    );

    const handleKeyDownChange = useCallback(
        (company: App.Company, index: number) => (e: KeyboardEvent<HTMLElement>) => {
            e.stopPropagation();

            switch (e.key) {
            case 'Enter':
                onChangeCompany(company.companyId);
                break;
            case 'ArrowDown':
                const nextIndex = (index + 1) % filteredCompanies.length;
                listItemRefs.current[nextIndex]?.focus();
                break;
            case 'ArrowUp':
                if (index === 0) {
                    inputRef.current?.focus();
                } else {
                    const prevIndex =
                            (index - 1 + filteredCompanies.length) % filteredCompanies.length;
                    listItemRefs.current[prevIndex]?.focus();
                }
                break;
            default:
                break;
            }
        },
        [onChangeCompany, filteredCompanies.length, listItemRefs, inputRef]
    );

    return (
        <MenuStyled.Company
            onClick={handleChangeCompany(company)}
            onKeyDown={handleKeyDownChange(company, index)}
            ref={(el) => {
                listItemRefs.current[index] = el;
            }}
        >
            <MenuStyled.CompanyInfo>
                <MenuStyled.WrapLogo>
                    <Logo
                        size={24}
                        logo_url={company.lightLogoUrl}
                        dark_logo_url={company.darkLogoUrl}
                        style={{
                            borderRadius: 5,
                            objectFit   : 'contain'
                        }}
                    />
                </MenuStyled.WrapLogo>

                <p>{company.name}</p>
            </MenuStyled.CompanyInfo>

            {selectCompanyId === company.companyId ? (
                <RadioButtonCheckedIcon
                    sx={{
                        fontSize: 24,
                        color   : (theme) => theme.palette.semantic.foreground.brand.primary
                    }}
                    aria-label="Checked"
                />
            ) : (
                <RadioButtonUncheckedIcon
                    sx={{
                        fontSize: 24,

                        color: (theme) => theme.palette.semantic.foreground.disabled
                    }}
                    aria-label="Unchecked"
                />
            )}
        </MenuStyled.Company>
    );
}

export default memo(SubMenuCompany);
