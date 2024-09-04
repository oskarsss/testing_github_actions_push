import BusinessIcon from '@mui/icons-material/Business';
import { useRouter } from 'next/router';
import { PlateIcon } from '@/@core/icons/custom-nav-icons/icons';
import navigateToPage from '@/utils/navigateToPage';
import PageTabs, { type PageTabsChangeAction } from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import { Box } from '@mui/material';
import type { MouseEvent, ReactNode } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type View = {
    view_id: string;
    name: IntlMessageKey;
    icon: ReactNode;
};

const VIEWS: View[] = [
    {
        view_id: '/plates',
        name   : 'entity:plates',
        icon   : PlateIcon()
    },
    {
        view_id: '/plates/companies',
        name   : 'entity:companies',
        icon   : <BusinessIcon color="action" />
    }
];

export default function PageSwitcher() {
    const { t } = useAppTranslation();
    const router = useRouter();

    const selected_view_id = router.route;

    const handleChange: PageTabsChangeAction<string> = (e, viewId: string) => {
        if (viewId !== selected_view_id) {
            if (viewId !== router.route) {
                if (viewId === '/plates/companies') {
                    navigateToPage(viewId, e as MouseEvent);

                    return;
                }

                navigateToPage(viewId, e as MouseEvent);
            }
        }
    };
    return (
        <div>
            <PageTabs
                value={selected_view_id}
                isScrollable
                onChange={handleChange}
            >
                {VIEWS.map((view) => (
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
        </div>
    );
}
