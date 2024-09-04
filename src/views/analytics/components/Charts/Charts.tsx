import { Fragment } from 'react';
import { useAnalytics } from '@/store/analytics/hooks';
import { Column, Item } from '@/store/analytics/types';
import { Container, Wrapper } from '@/views/analytics/components/Charts/styled';
import UseChart from '../../../../hooks/useChart';
import Loading from '../../../../@core/components/table/Loading';

export default function Charts() {
    const {
        view,
        isLoading
    } = useAnalytics();

    const renderItems = (items: Column[] | Item[]) =>
        items.map((item, index) => {
            if (item.items && item.type) {
                return (
                    <Fragment key={item.id ?? item.type + index}>
                        {/* eslint-disable-next-line no-use-before-define */}
                        {container(item.type, item.width, item.items)}
                    </Fragment>
                );
            }
            return (
                <Wrapper
                    key={item.id ?? index}
                    style={{
                        ...item.styles,
                        width   : item.width,
                        minWidth: item.width,
                        maxWidth: item.width
                    }}
                >
                    {UseChart(item.id)}
                </Wrapper>
            );
        });

    const container = (type: string, width: string, items: Column[] | Item[]) => (
        <Wrapper
            isColumn={type !== 'row'}
            style={{ width, minWidth: width, maxWidth: width }}
        >
            {renderItems(items)}
        </Wrapper>
    );

    if (isLoading) {
        return (
            <Container>
                <Loading isLoading={isLoading} />
            </Container>
        );
    }

    return <Container>{renderItems(view?.columns)}</Container>;
}
