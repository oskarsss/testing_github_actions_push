/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import FactoringCompanySelect from '@/@core/fields/select/FactoringCompanySelect';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ExportGrpcService from '@/@grpcServices/services/export.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { CardMedia, Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useAppTranslation } from '@/hooks/useAppTranslation';

// @ts-ignore
import DarkLoader from '../../../../../../public/loading_animation/dark_exporting.mp4';

// @ts-ignore
import LightLoader from '../../../../../../public/loading_animation/light_exporting.mp4';

export const useExportFactoringBillingDialog = hookFabric(ExportFactoringBilling, (props) => (
    <DialogComponents.DialogWrapper
        padding="16px"
        maxWidth="560px"
        {...props}
    />
));

type DefaultValues = {
    factoringCompanyId: string;
};

function Exporting() {
    const { mode } = useTheme().palette;
    return (
        <Stack>
            <CardMedia
                component="video"
                src={mode === 'light' ? LightLoader : DarkLoader}
                autoPlay
                loop
                muted
                style={{
                    width : '100%',
                    height: '100%'
                }}
            />
        </Stack>
    );
}

function ExportError({ tryAgain }: { tryAgain: () => void }) {
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
        >
            <Typography
                component="p"
                textAlign="center"
                variant="body1"
                fontSize="18px"
            >
                {`${t('common:error')}. `}
                <Typography
                    component="span"
                    onClick={tryAgain}
                    variant="body1"
                    sx={{
                        cursor   : 'pointer',
                        color    : palette.semantic.text.brand.primary,
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    {t('common:try_again')}
                </Typography>
            </Typography>
        </Stack>
    );
}

function ExportSuccess({ filePath }: { filePath: string }) {
    const downloadFile = useDownloadFile();
    const { palette } = useTheme();
    const { t } = useAppTranslation('billing');

    const download = () => {
        downloadFile(filePath);
    };
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
        >
            <Typography
                component="p"
                variant="body1"
                fontSize="18px"
                textAlign="center"
            >
                {t('dialogs.export_factoring.success.title')}
                <Typography
                    component="span"
                    onClick={download}
                    fontSize="18px"
                    variant="body1"
                    sx={{
                        cursor   : 'pointer',
                        color    : palette.semantic.text.brand.primary,
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    {` ${t('dialogs.export_factoring.success.link')}`}
                </Typography>
            </Typography>
        </Stack>
    );
}

function ExportFactoringBilling() {
    const [trigger, triggerState] = ExportGrpcService.useExportFactoringInvoicesMutation();
    const [wasExtracted, setWasExtracted] = useState(false);

    const downloadFile = useDownloadFile();

    const {
        handleSubmit,
        control
    } = useForm<DefaultValues>({
        defaultValues: {
            factoringCompanyId: ''
        }
    });

    const dialog = useExportFactoringBillingDialog(true);

    const submit = (data: DefaultValues) => {
        trigger({
            factoringCompanyId: data.factoringCompanyId
        })
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath);
            });

        setWasExtracted(true);
    };

    const tryAgain = () => {
        setWasExtracted(false);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="billing:dialogs.export_factoring.title" />
            <Divider />
            {wasExtracted ? (
                <>
                    {triggerState.isLoading && <Exporting />}
                    {triggerState.isSuccess && (
                        <ExportSuccess filePath={triggerState.data.filePath} />
                    )}

                    {triggerState.isError && <ExportError tryAgain={tryAgain} />}
                </>
            ) : (
                <DialogComponents.Fields
                    sx={{
                        paddingY: '16px'
                    }}
                >
                    <DialogComponents.Field xs={12}>
                        <FactoringCompanySelect
                            variant="outlined"
                            width="100%"
                            name="factoringCompanyId"
                            control={control}
                        />
                    </DialogComponents.Field>
                </DialogComponents.Fields>
            )}
            <Divider />

            {wasExtracted ? (
                <DialogComponents.ActionsWrapper>
                    <DialogComponents.CancelButton
                        cancel_text="common:button.close"
                        onCancel={dialog.close}
                    />
                </DialogComponents.ActionsWrapper>
            ) : (
                <DialogComponents.DefaultActions
                    submitText="common:button.export"
                    onCancel={dialog.close}
                    submitLoading={triggerState.isLoading}
                />
            )}
        </DialogComponents.Form>
    );
}

export default ExportFactoringBilling;
