import { PropsWithChildren } from 'react';
import PageWithInfoPanelStyled from '@/@core/ui-kits/basic/info-panel/PageWithInfoPanelStyled';
import CloseButton from '@/@core/ui-kits/basic/close-button/CloseButton';

type Props = PropsWithChildren<{
    isPanelOne: boolean;
    closePanel: () => void;
}>;

export default function InfoPanel({
    isPanelOne,
    closePanel,
    children
}: Props) {
    return (
        <PageWithInfoPanelStyled.Panel isPanelOpen={isPanelOne}>
            <PageWithInfoPanelStyled.Drawer
                variant="persistent"
                anchor="right"
                open={isPanelOne}
            >
                {children}
            </PageWithInfoPanelStyled.Drawer>

            <CloseButton onClose={closePanel} />
        </PageWithInfoPanelStyled.Panel>
    );
}
