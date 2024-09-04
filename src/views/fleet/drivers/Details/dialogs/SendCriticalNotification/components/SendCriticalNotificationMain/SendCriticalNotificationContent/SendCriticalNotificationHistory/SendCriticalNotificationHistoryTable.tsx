import CriticalNotificationStyled from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/styled';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { Typography } from '@mui/material';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo } from 'react';
import { Notifications } from './SendCriticalNotificationHistory';

type Props = {
    isLoading: boolean;
    array: Notifications;
};

export default function SendCriticalNotificationHistoryTable({
    isLoading,
    array
}: Props) {
    const { t } = useAppTranslation('modals');

    const renderCriticalNotificationHistory = useMemo(() => {
        if (isLoading) {
            return <DialogComponents.FetchingProcess />;
        }
        if (!isLoading && array.length === 0) {
            return (
                <CriticalNotificationStyled.EmptyTable variant="body1">
                    {t('drivers.send_critical_notification.table.body.empty')}
                </CriticalNotificationStyled.EmptyTable>
            );
        }

        return array.map((el) => (
            <CriticalNotificationStyled.TableBodyRow
                key={el.id}
                style={{ display: 'flex' }}
            >
                <CriticalNotificationStyled.TableBodyRowCell>
                    <Typography
                        variant="body1"
                        fontWeight={500}
                    >
                        {el.full_name}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontSize={11}
                    >
                        {el.send_at}
                    </Typography>
                </CriticalNotificationStyled.TableBodyRowCell>
                <CriticalNotificationStyled.TableBodyRowCell
                    variant="body1"
                    flexGrow={1}
                >
                    {el.body}
                </CriticalNotificationStyled.TableBodyRowCell>
                <CriticalNotificationStyled.TableBodyRowCell variant="body2">
                    <CriticalNotificationStyled.Status
                        color={el.status === 'delivered' ? 'success' : 'error'}
                    >
                        <span />
                        {t(`drivers.send_critical_notification.table.status.${el.status}`)}
                    </CriticalNotificationStyled.Status>
                </CriticalNotificationStyled.TableBodyRowCell>
            </CriticalNotificationStyled.TableBodyRow>
        ));
    }, [isLoading, array]);

    return (
        <CriticalNotificationStyled.Table>
            <CriticalNotificationStyled.TableHeader>
                <CriticalNotificationStyled.TableHeaderCell variant="body2">
                    {t('drivers.send_critical_notification.table.header.from')}
                </CriticalNotificationStyled.TableHeaderCell>
                <CriticalNotificationStyled.TableHeaderCell
                    variant="body2"
                    sx={{ flexGrow: 1 }}
                >
                    {t('drivers.send_critical_notification.table.header.message')}
                </CriticalNotificationStyled.TableHeaderCell>
                <CriticalNotificationStyled.TableHeaderCell variant="body2">
                    {t('drivers.send_critical_notification.table.header.status')}
                </CriticalNotificationStyled.TableHeaderCell>
            </CriticalNotificationStyled.TableHeader>
            <PerfectScrollbar>
                <CriticalNotificationStyled.TableBody>
                    {renderCriticalNotificationHistory}
                </CriticalNotificationStyled.TableBody>
            </PerfectScrollbar>
        </CriticalNotificationStyled.Table>
    );
}
