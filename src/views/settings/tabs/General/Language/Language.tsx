import Container from '@/views/settings/components/Container/Container';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import React, { useMemo, useState } from 'react';
import { Divider } from '@mui/material';
import LanguageComponents from '@/views/settings/tabs/General/Language/LanguageComponents';
import { useRouter } from 'next/router';
import LANGUAGE_CONFIG from '@/views/settings/tabs/General/Language/LANGUAGE_CONFIG';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';

export default function Language() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const filteredLanguages = useMemo(
        () =>
            LANGUAGE_CONFIG.filter((item) => {
                const transformSearch = search.toLowerCase().trim();
                if (!search.trim()) {
                    return true;
                }
                return Object.values(item).join(' ').toLowerCase()
                    .includes(transformSearch);
            }),
        [search]
    );

    return (
        <Container sx={{ gap: '16px' }}>
            <SettingsHeader
                title="settings:navigation.my_account.language"
                icon={<SettingIcons.Language />}
            >
                <LanguageComponents.SearchInput
                    search={search}
                    setSearch={setSearch}
                />
            </SettingsHeader>

            <Divider sx={{ margin: 0 }} />

            <PerfectScrollbar
                sx={{
                    marginRight : '-16px',
                    paddingRight: '16px'
                }}
            >
                <LanguageComponents.List>
                    {filteredLanguages.map((item) => (
                        <LanguageComponents.ListItem
                            key={item.code}
                            href={router.route}
                            locale={item.code}
                            aria-label={item.code}
                        >
                            <LanguageComponents.ListItemWrapper>
                                <LanguageComponents.ListItemFlag>
                                    {item.Flag && <item.Flag title="" />}
                                </LanguageComponents.ListItemFlag>
                                <LanguageComponents.ListItemText>
                                    {`${item.name}${item.secondary ? ` - ${item.secondary}` : ''}`}
                                </LanguageComponents.ListItemText>
                            </LanguageComponents.ListItemWrapper>
                            <LanguageComponents.ListItemRadioButton
                                checked={item.code === router.locale}
                            />
                        </LanguageComponents.ListItem>
                    ))}
                </LanguageComponents.List>
            </PerfectScrollbar>
        </Container>
    );
}
