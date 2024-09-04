import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import Button from '@mui/material/Button';
import ConnectedItemComponents from '@/views/settings/tabs/Integrations/Details/components/Content/components/ConnectedItem/ConnectedItemComponents';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type ConnectedItemProps = {
    onClick: (e: MouseEvent) => void;
    name: IntlMessageKey;
    icon: ReactNode;
    percent: number;
    total_connected: number;
    total: number;
    style?: CSSProperties;
};

export default function ConnectedItem({
    onClick,
    name,
    icon,
    percent,
    total_connected,
    total,
    style = {}
}: ConnectedItemProps) {
    const { t } = useAppTranslation();
    return (
        <ConnectedItemComponents.Container style={style}>
            <ConnectedItemComponents.LeftWrapper>
                <ConnectedItemComponents.Chart.Wrapper>
                    <ConnectedItemComponents.Chart.Progress
                        size={44}
                        variant="determinate"
                        value={percent}
                    />
                    <ConnectedItemComponents.Chart.Icon>{icon}</ConnectedItemComponents.Chart.Icon>
                </ConnectedItemComponents.Chart.Wrapper>

                <div>
                    <ConnectedItemComponents.Title>{t(name)}</ConnectedItemComponents.Title>
                    <ConnectedItemComponents.Description>
                        {total_connected} {t('settings:integrations.details.out_of')} {total}
                    </ConnectedItemComponents.Description>
                </div>
            </ConnectedItemComponents.LeftWrapper>
            <Button
                variant="outlined"
                onClick={onClick}
            >
                {t('common:button.manage')}
            </Button>
        </ConnectedItemComponents.Container>
    );
}
