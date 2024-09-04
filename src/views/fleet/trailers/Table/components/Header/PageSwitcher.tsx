import PageTabs, { type PageTabsChangeAction } from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import { Box } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import type { ReactNode } from 'react';

export type View = {
    view_id: string;
    name: IntlMessageKey;
    testID: string;
    icon: ReactNode;
};

type Props = {
    selected_view_id: string;
    selectView: (view_index: string) => void;
    views: View[];
};
export default function PageSwitcher({
    selected_view_id,
    selectView,
    views
}: Props) {
    const { t } = useAppTranslation();

    const handleChange: PageTabsChangeAction<string> = (_, view_id: string) => {
        if (view_id !== selected_view_id) {
            selectView(view_id);
        }
    };
    return (
        <PageTabs
            value={selected_view_id}
            isScrollable
            onChange={handleChange}
        >
            {views.map((view) => (
                <PageTab
                    key={view.view_id}
                    label={(
                        <Box
                            component="span"
                            overflow="hidden"
                            textOverflow="ellipsis"
                        >
                            {t(view.name)}
                        </Box>
                    )}
                    value={view.view_id}
                    id={view.view_id}
                    style={{ fontWeight: 700 }}
                />
            ))}
        </PageTabs>
    );
}
