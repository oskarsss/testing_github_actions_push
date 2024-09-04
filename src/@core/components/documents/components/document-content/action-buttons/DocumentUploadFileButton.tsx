import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

type Props = {
    uploadFile: () => void;
    url?: string;
};

export default function DocumentUploadFileButton({
    uploadFile,
    url
}: Props) {
    return (
        <IconButtonWithTooltip
            tooltip="core:documents.tooltips.new"
            onClick={uploadFile}
            icon={<AddPhotoAlternateIcon color="primary" />}
        />
    );
}
