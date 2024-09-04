import TableViews from '@/@core/components/table-views/TableViews';
import { ReactElement } from 'react';
import { ViewID } from '../../RecurringTransactions';

export type Views = {
    viewId: ViewID;
    name: string;
    icon: ReactElement;
}[];

type PageSwitcherProps = {
    views: Views;
    selected_view_id: string;
    selectView: (view_id: ViewID) => void;
};

export default function PageSwitcher({
    selected_view_id,
    selectView,
    views
}: PageSwitcherProps) {
    return (
        <TableViews
            views={views}
            selectedViewId={selected_view_id}
            selectView={(viewId) => selectView(viewId as ViewID)}
            iconPosition="start"
            isScrollable
        />
    );
}
