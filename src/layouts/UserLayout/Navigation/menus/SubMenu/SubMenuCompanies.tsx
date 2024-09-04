import { memo, ChangeEvent, useState, useMemo, KeyboardEvent, useRef } from 'react';
import MenuStyled from '@/layouts/UserLayout/Navigation/menus/SubMenu/styled';
import App from '@/store/app/types';
import { TextField, Typography, FormControl } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SubMenuCompany from './SubMenuCompany';

type Props = {
    companyId: string;
    companies: App.Company[];
    onChangeCompany: (companyId: string) => void;
};

function SubMenuCompanies({
    companyId,
    companies,
    onChangeCompany
}: Props) {
    const { t } = useAppTranslation('navigation');
    const [search, setSearch] = useState('');
    const listItemRefs = useRef<(HTMLElement | null)[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredCompanies = useMemo(
        () =>
            companies.filter((company) =>
                company.name.toLowerCase().includes(search.toLowerCase())),
        [search, companies]
    );

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if ((e.key === 'ArrowDown' || e.key === 'Tab') && filteredCompanies.length > 0) {
            e.preventDefault();
            listItemRefs.current[0]?.focus();
        }
    };

    const countOfCompaniesForShowSearchField = 10;

    return (
        <>
            {companies.length >= countOfCompaniesForShowSearchField && (
                <FormControl sx={{ padding: '10px 4px 0' }}>
                    <TextField
                        size="small"
                        variant="outlined"
                        autoComplete="off"
                        value={search}
                        onChange={searchHandler}
                        placeholder={t('header_menu.sub_menu.companies.search_field.placeholder')}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputRef={inputRef}
                        sx={{
                            '& .MuiInputBase-input': {
                                background: (theme) => theme.palette.semantic.background.white
                            }
                        }}
                        onKeyDown={handleSearchKeyDown}
                        onClickCapture={(e) => e.stopPropagation()}
                    />
                </FormControl>
            )}

            <MenuStyled.Companies>
                {filteredCompanies.length ? (
                    filteredCompanies.map((company, index) => (
                        <SubMenuCompany
                            key={company.companyId}
                            filteredCompanies={filteredCompanies}
                            listItemRefs={listItemRefs}
                            inputRef={inputRef}
                            selectCompanyId={companyId}
                            company={company}
                            index={index}
                            onChangeCompany={onChangeCompany}
                        />
                    ))
                ) : (
                    <Typography
                        variant="body1"
                        fontWeight={500}
                        textAlign="center"
                    >
                        {t('header_menu.sub_menu.companies.empty_list')}
                    </Typography>
                )}
            </MenuStyled.Companies>
        </>
    );
}

export default memo(SubMenuCompanies);
