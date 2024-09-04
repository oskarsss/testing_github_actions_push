import { useMemo } from 'react';
import ImportGrpcService from '@/@grpcServices/services/import.service';
import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import Tabs from './components/Tabs';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import Content from './components/Content';

type Props = {
    extractData: () => void;
    isShowSelectType: boolean;
};
export default function StepFirst({
    isShowSelectType,
    extractData
}: Props) {
    const { emptyArray } = useStableLinks();

    const {
        data,
        error,
        isLoading
    } = ImportGrpcService.useGetImportConfigQuery({});

    const categories = useMemo(() => data?.categories || emptyArray, [data?.categories]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (!categories?.length) {
        return null;
    }

    return (
        <>
            {isShowSelectType && <Tabs categories={categories} />}
            <Content
                categories={categories}
                extractData={extractData}
            />
        </>
    );
}
