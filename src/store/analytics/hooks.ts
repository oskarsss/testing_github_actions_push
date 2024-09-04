import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { View } from '@/store/analytics/types';

// eslint-disable-next-line import/prefer-default-export
export function useAnalytics() {
    const selected_view_id = useAppSelector((state) => state.analytics.selected_view_id);

    // UNCOMMENT LINES ABOVE AND DELETE BELOW
    // FIX REQUEST
    const result = useMemo(() => {
        const data = {
            views: [
                {
                    viewId : '0',
                    name   : 'Financial',
                    columns: [
                        {
                            type : 'row',
                            items: [
                                {
                                    id    : 'total_unpaid',
                                    type  : 'chart',
                                    width : '50%',
                                    styles: {}
                                },
                                {
                                    type : 'column',
                                    items: [
                                        {
                                            id    : 'total_loads',
                                            width : '100%',
                                            styles: {}
                                        },
                                        {
                                            id    : 'top_debtors',
                                            width : '100%',
                                            styles: {}
                                        }
                                    ],
                                    width: '50%'
                                }
                            ],
                            width: '100%'
                        },
                        {
                            id    : 'aging_report',
                            width : '100%',
                            styles: { flexGrow: 1, minHeight: '340px', flexShrink: 0 }
                        }
                    ]
                }
            ] as View[]
        };

        return {
            isError  : false,
            isLoading: false,
            views    : data ? data.views : [],
            view     : data.views.find((view) => view.viewId === selected_view_id) as View
        };
    }, [selected_view_id]);

    return result;
}
