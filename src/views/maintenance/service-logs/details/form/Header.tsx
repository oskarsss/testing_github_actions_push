import { memo } from 'react';
import { useRouter } from 'next/router';
import { useConfirm } from '@/@core/components/confirm-dialog';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import DangerousIcon from '@mui/icons-material/Dangerous';
import navigateToPage from '@/utils/navigateToPage';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { SelectServiceLogsAction } from '@/store/maitenance/service-logs/slice';
import { useDispatch } from 'react-redux';
import { useServiceLogForm } from '.';

type Props = {
    serviceLogId: string;
    serviceLogFriendlyId: number;
    isUpdating: boolean;
    onClose?: () => void;
};

function Header({
    serviceLogId,
    serviceLogFriendlyId,
    isUpdating,
    onClose
}: Props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const confirm = useConfirm();

    const [deleteServiceLog, { isLoading }] = ServiceLogsGrpcService.useDeleteServiceLogMutation();

    const closeServiceProviderPanel = () => {
        dispatch(SelectServiceLogsAction.selectServiceLogId(''));
        dispatch(SelectServiceLogsAction.selectServiceLog(null));
    };

    const deleteHandler = () => {
        confirm({
            icon        : <DangerousIcon color="secondary" />,
            title       : 'maintenance:service_logs.modals.delete.title',
            body        : 'maintenance:service_logs.modals.delete.description',
            confirm_text: 'common:button.delete',
            onConfirm   : () =>
                deleteServiceLog({ serviceLogId })
                    .unwrap()
                    .then(() => {
                        if (onClose) {
                            onClose();
                            closeServiceProviderPanel();
                        }

                        if (router.pathname === '/maintenance/service-logs/[id]') {
                            navigateToPage('/maintenance/service-logs');
                        }
                    })
        });
    };

    const {
        formState: { isDirty }
    } = useServiceLogForm();

    return (
        <FullDialog.Header
            sx={{
                ...(!onClose && { zIndex: 1200 })
            }}
        >
            <FullDialog.HeaderTitle
                title={`maintenance:service_logs.${
                    onClose ? 'modals.edit' : 'details'
                }.header.title`}
                translationOptions={{ friendlyId: serviceLogFriendlyId }}
            />

            <FullDialog.ActionsWrapper>
                {onClose && (
                    <FullDialog.NewTabButton path={`/maintenance/service-logs/${serviceLogId}`} />
                )}

                <FullDialog.DeleteButton
                    disabled={false}
                    isLoading={isLoading}
                    onClick={deleteHandler}
                />

                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isUpdating}
                    type="update"
                />

                {onClose && <FullDialog.CloseButton onClose={onClose} />}
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}

export default memo(Header);
