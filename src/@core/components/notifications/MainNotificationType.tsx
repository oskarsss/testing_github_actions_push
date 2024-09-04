import { memo, useCallback, useMemo, useState } from 'react';
import { Stack, Tooltip, Typography } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { SettingsNotificationUpdate } from '@proto/settings_notification';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';
import type { NotificationModel_NotificationSetting } from '@proto/models/model_notification';
import { isEqual } from 'lodash';

type Action = 'enabled' | 'enabledSms' | 'enabledEmail' | 'enabledWebPush';

type State = {
    label: Action;
    checked: boolean;
    indeterminate: boolean;
};

type Props = {
    title: IntlMessageKey;
    notifications: NotificationModel_NotificationSetting[];
    onHandleUpdate: (settings: SettingsNotificationUpdate[]) => Promise<unknown>;
};

function MainNotificationType({
    title,
    notifications,
    onHandleUpdate
}: Props) {
    const { t } = useAppTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const getNotificationState = useCallback(
        (key: Action) => ({
            indeterminate: notifications.some((notification) => notification[key]),
            checked      : notifications.every((notification) => notification[key])
        }),
        [notifications]
    );

    const notificationStates: Record<Action, { checked: boolean; indeterminate: boolean }> =
        useMemo(
            () => ({
                enabled       : getNotificationState('enabled'),
                enabledSms    : getNotificationState('enabledSms'),
                enabledEmail  : getNotificationState('enabledEmail'),
                enabledWebPush: getNotificationState('enabledWebPush')
            }),
            [getNotificationState]
        );

    const enabledStates: State[] = useMemo(
        () =>
            Object.entries(notificationStates).map(([label, state]) => ({
                label: label as Action,
                ...state
            })),
        [notificationStates]
    );

    const selectedStateAmount: Record<Action, number> = useMemo(
        () => ({
            enabled     : notifications.filter((notification) => notification.enabled).length,
            enabledSms  : notifications.filter((notification) => notification.enabledSms).length,
            enabledEmail: notifications.filter((notification) => notification.enabledEmail).length,

            enabledWebPush: notifications.filter((notification) => notification.enabledWebPush)
                .length
        }),
        [notifications]
    );

    const handleNotificationAction = (action: Action) => {
        setIsLoading(true);

        const payload = notifications.map((notification) => ({
            notificationType: notification.notificationType,
            ...(action === 'enabled' &&
            (notificationStates.enabled.checked || notificationStates.enabled.indeterminate)
                ? {
                    enabled       : false,
                    enabledSms    : false,
                    enabledEmail  : false,
                    enabledWebPush: false
                }
                : {
                    enabled:
                          notificationStates.enabledSms.indeterminate ||
                          notificationStates.enabledEmail.indeterminate ||
                          notificationStates.enabledWebPush.indeterminate
                              ? notification.enabled
                              : true,
                    enabledSms:
                          action === 'enabledSms'
                              ? !notificationStates.enabledSms.checked &&
                                !notificationStates.enabledSms.indeterminate
                              : notification.enabledSms,
                    enabledEmail:
                          action === 'enabledEmail'
                              ? !notificationStates.enabledEmail.checked &&
                                !notificationStates.enabledEmail.indeterminate
                              : notification.enabledEmail,
                    enabledWebPush:
                          action === 'enabledWebPush'
                              ? !notificationStates.enabledWebPush.checked &&
                                !notificationStates.enabledWebPush.indeterminate
                              : notification.enabledWebPush
                })
        }));

        onHandleUpdate(payload).finally(() => setIsLoading(false));
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="16px"
            paddingBottom="6px"
            paddingTop="6px"
            borderBottom="1px solid"
            borderColor="semantic.border.secondary"
            sx={{
                '&:first-of-type': {
                    paddingTop: 0
                },
                '&:last-child': {
                    borderBottom: 'none'
                }
            }}
        >
            <Typography
                variant="body1"
                fontSize="14px"
                fontWeight={500}
                color="semantic.text.disabled"
            >
                {t(title)}
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap="37px"
                sx={{
                    '&:last-child': {
                        paddingRight: '10px'
                    }
                }}
            >
                {enabledStates.map((state) => (
                    <Tooltip
                        key={state.label}
                        placement="top"
                        title={t(
                            `common:notifications.tooltips.${
                                !state.checked && !selectedStateAmount[state.label]
                                    ? 'enable_count'
                                    : 'disable_count'
                            }`,
                            {
                                count:
                                    !state.checked && !selectedStateAmount[state.label]
                                        ? notifications.length
                                        : selectedStateAmount[state.label]
                            }
                        )}
                        disableInteractive
                    >
                        <span style={{ display: 'flex' }}>
                            <SettingsCheckbox
                                onClick={() => handleNotificationAction(state.label)}
                                disabled={isLoading}
                                indeterminate={state.indeterminate && !state.checked}
                                checked={state.checked}
                                aria-label={`action_${state.label}`}
                                sx={{
                                    '&.MuiCheckbox-indeterminate': {
                                        color: 'semantic.foreground.primary'
                                    },
                                    '&.MuiCheckbox-indeterminate:hover': {
                                        boxShadow: ({ palette }) =>
                                            `0px 0px 0px 4px ${
                                                palette.colors.gray[palette.isLight ? 50 : 800]
                                            }`
                                    }
                                }}
                            />
                        </span>
                    </Tooltip>
                ))}
            </Stack>
        </Stack>
    );
}

export default memo(MainNotificationType, isEqual);
