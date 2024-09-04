import { ItemsWrapper, ScrollBar } from '@/views/map/styled_components';
import { useRef } from 'react';
import { useMapSelectedView } from '@/store/map/hooks';
import { views_options } from '../views_options';
import ScrollProvider from '../../contexts/ScrollContext';

export default function Panel() {
    const { selected_view_id } = useMapSelectedView();
    const scrollBarRef = useRef<HTMLElement | null>(null);

    const { RenderComponent } = views_options.find((view) => view.viewId === selected_view_id) || {
        RenderComponent: () => null
    };
    const Component = RenderComponent as React.FC;
    return (
        <ScrollProvider scrollRef={scrollBarRef}>
            <ScrollBar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
                containerRef={(ref) => {
                    scrollBarRef.current = ref;
                }}
            >
                <ItemsWrapper>
                    <Component />
                </ItemsWrapper>
            </ScrollBar>
        </ScrollProvider>
    );
}
