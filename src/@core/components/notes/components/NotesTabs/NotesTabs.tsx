import { SyntheticEvent, SetStateAction, Dispatch, useEffect, useMemo, ReactElement } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import Notes from '@/store/notes/types';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ChatWithDriver } from '@/@core/components/notes/types';
import { NoteEntityType } from '@/models/notes/note-entity-type';
import TabsStyled from '@/@core/ui-kits/basic/tabs/TabsStyled';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import { SxProps, Theme } from '@mui/material';
import { useHorizontalTabsScroll } from '@/@core/ui-kits/basic/tabs/hooks';

export type NotesViews = Array<{
    value: Notes.Tabs;
    label: IntlMessageKey;
    count: boolean;
    icon?: ReactElement;
}>;

const defaultViews: NotesViews = [
    {
        value: 'general',
        label: 'core:notes.tabs.all',
        count: false
    },
    {
        value: 'team',
        label: 'core:notes.tabs.team',
        count: true
    }
];

type Props = {
    entityId: string;
    entityType: NoteEntityType;
    tabValue: Notes.Tabs;
    setTabValue: Dispatch<SetStateAction<Notes.Tabs>>;
    setSelectedEntity: Dispatch<SetStateAction<{ entity_id: string; entity_type: NoteEntityType }>>;
    chatsWithDrivers?: ChatWithDriver[];
    countNotes: Record<string, number>;
    sx?: SxProps<Theme>;
};

export default function NotesTabs({
    entityId,
    entityType,
    tabValue,
    setTabValue,
    countNotes,
    setSelectedEntity,
    chatsWithDrivers,
    sx
}: Props) {
    const { t } = useAppTranslation();
    useEffect(() => {
        if (localStorage.getItem('notes_tab') === 'team') {
            setTabValue('team');
        }
    }, []);

    const changeTab = (event: SyntheticEvent, newValue: Notes.Tabs) => {
        if (['general', 'team', 'driver'].includes(newValue)) {
            localStorage.setItem('notes_tab', newValue);
            setSelectedEntity({
                entity_id  : entityId,
                entity_type: entityType
            });
        } else {
            const [entityType, entityId] = newValue.split('_');
            if (entityType && entityId) {
                setSelectedEntity({
                    entity_id  : entityId,
                    entity_type: entityType as NoteEntityType
                });
            }
        }
        setTabValue(newValue);
    };

    const views = useMemo(() => {
        const newViews = defaultViews.map((view) => ({
            ...view,
            label: t(view.label)
        }));

        if (chatsWithDrivers?.length) {
            chatsWithDrivers?.forEach((entity) => {
                newViews.push({
                    value: `${entity.entity_type}_${entity.entity_id}`,
                    label: entity.label,
                    count: true,
                    icon : (
                        <VectorIcons.NavIcons.Driver
                            size={16}
                            style={{ fill: 'currentColor' }}
                        />
                    )
                });
            });
        } else {
            newViews.push({
                value: 'driver',
                label: t('core:notes.tabs.driver'),
                count: true
            });
        }
        return newViews;
    }, [chatsWithDrivers, t]);

    const {
        tabsRef,
        onWheelTabs
    } = useHorizontalTabsScroll();

    return (
        <TabsStyled.Tabs
            ref={tabsRef}
            onWheel={onWheelTabs}
            variant="scrollable"
            scrollButtons={false}
            visibleScrollbar
            value={tabValue}
            onChange={changeTab}
            sx={sx}
        >
            {views.map((view) => (
                <TabsStyled.Tab
                    key={view.value}
                    value={view.value}
                    icon={view.icon}
                    iconPosition="start"
                    label={(
                        <>
                            {view.label}
                            {view.count && (
                                <CountBadge
                                    count={countNotes[view.value]}
                                    isSelected={tabValue === view.value}
                                />
                            )}
                        </>
                    )}
                />
            ))}
        </TabsStyled.Tabs>
    );
}
