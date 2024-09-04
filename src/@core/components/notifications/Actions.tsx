import { memo, useMemo, useState } from 'react';
import { Stack, Tooltip } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { SettingsNotificationUpdate } from '@proto/settings_notification';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';

type State = {
    label: 'enabled' | 'enabledSms' | 'enabledEmail' | 'enabledWebPush';
    value: boolean;
};

type Props = {
    enabled: boolean;
    enabledSms: boolean;
    enabledEmail: boolean;
    enabledWebPush: boolean;
    notificationType: string;
    onHandleUpdate: (settings: SettingsNotificationUpdate[]) => Promise<unknown>;
};

function Actions({
    enabled,
    enabledSms,
    enabledEmail,
    enabledWebPush,
    notificationType,
    onHandleUpdate
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useAppTranslation();

    const enabledStates: State[] = useMemo(
        () => [
            {
                label: 'enabled',
                value: enabled
            },
            {
                label: 'enabledSms',
                value: enabledSms
            },
            {
                label: 'enabledEmail',
                value: enabledEmail
            },
            {
                label: 'enabledWebPush',
                value: enabledWebPush
            }
        ],
        [enabled, enabledSms, enabledEmail, enabledWebPush]
    );

    const handleNotificationAction = (
        action: 'enabled' | 'enabledSms' | 'enabledEmail' | 'enabledWebPush'
    ) => {
        setIsLoading(true);
        const payload =
            action === 'enabled' && enabled
                ? {
                    enabled       : false,
                    enabledSms    : false,
                    enabledEmail  : false,
                    enabledWebPush: false
                }
                : {
                    enabled       : true,
                    enabledSms    : action === 'enabledSms' ? !enabledSms : enabledSms,
                    enabledEmail  : action === 'enabledEmail' ? !enabledEmail : enabledEmail,
                    enabledWebPush: action === 'enabledWebPush' ? !enabledWebPush : enabledWebPush
                };

        onHandleUpdate([
            {
                notificationType,
                ...payload
            }
        ]).then(() => setIsLoading(false));
    };

    return (
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
                    title={t(`common:notifications.tooltips.${state.value ? 'disable' : 'enable'}`)}
                    disableInteractive
                >
                    <span style={{ display: 'flex' }}>
                        <SettingsCheckbox
                            onClick={() => handleNotificationAction(state.label)}
                            checked={state.value}
                            disabled={isLoading}
                            aria-label={`action_${state.label}`}
                        />
                    </span>
                </Tooltip>
            ))}
        </Stack>
    );
}

export default memo(Actions);
