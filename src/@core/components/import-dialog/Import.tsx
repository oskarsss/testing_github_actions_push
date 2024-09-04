import React from 'react';
import { useAppSelector } from '@/store/hooks';
import Header from '@/@core/components/import-dialog/components/Header/Header';
import { useImportRequest } from '@/store/import/hooks';
import StepFirst from '@/@core/components/import-dialog/steps/StepFirst/StepFirst';
import StepSecond from '@/@core/components/import-dialog/steps/StepSecond/StepSecond';
import StepThird from '@/@core/components/import-dialog/steps/StepThird/StepThird';
import Report from '@/@core/components/import-dialog/steps/Report/Report';
import Stepper from './components/Stepper/Stepper';
import { Container, Wrap } from './styled';

type Props = {
    isShowSelectType: boolean;
    closeDialog: () => void;
};
export default function Import({
    isShowSelectType,
    closeDialog
}: Props) {
    const active_step = useAppSelector((state) => state.import.active_step);
    const {
        importData,
        extractData,
        extract_result,
        import_result,
        memoizedExtractData,
        memoizedImportData
    } = useImportRequest();

    return (
        <Container>
            <Header closeDialog={closeDialog} />
            <Wrap>
                <Stepper />
                {active_step === 0 && (
                    <StepFirst
                        isShowSelectType={isShowSelectType}
                        extractData={extractData}
                    />
                )}
                {active_step === 1 && (
                    <StepSecond
                        {...memoizedExtractData}
                        importData={importData}
                        error={extract_result.error}
                        isLoading={extract_result.isLoading}
                    />
                )}
                {active_step === 2 && (
                    <StepThird
                        {...import_result}
                        closeDialog={closeDialog}
                        extractTotalRows={memoizedExtractData.data?.stats.totalRows || 0}
                        importData={memoizedImportData.data}
                    />
                )}
                {active_step === 3 && (
                    <Report
                        importData={memoizedImportData.data}
                        isError={import_result.isError}
                    />
                )}
            </Wrap>
        </Container>
    );
}
