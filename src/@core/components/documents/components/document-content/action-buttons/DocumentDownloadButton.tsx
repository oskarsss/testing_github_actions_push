import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import DownloadIcon from '@mui/icons-material/Download';
import { useDownloadFile } from '@/hooks/useDownloadFile';

type Props = {
    file_name: string;
    url: string;
};

export default function DocumentDownLoadDocument({
    file_name,
    url
}: Props) {
    const downloadFile = useDownloadFile();
    const onDownload = () => downloadFile(url, file_name);
    return (
        <IconButtonWithTooltip
            tooltip="core:documents.tooltips.download"
            disabled={!url}
            onClick={onDownload}
            icon={<DownloadIcon color="primary" />}
        />
    );
}
