import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import TabIcon from '@mui/icons-material/Tab';
import React from 'react';

type Props = {
    blobUrl: string;
};

export default function DocumentOpenNewWindow({ blobUrl }: Props) {
    const onOpenNewWindow = () => {
        window.open(blobUrl, '_blank');
    };

    return (
        <IconButtonWithTooltip
            tooltip="core:documents.tooltips.open_new_tab"
            disabled={!blobUrl}
            onClick={onOpenNewWindow}
            icon={<TabIcon color="primary" />}
        />
    );
}
