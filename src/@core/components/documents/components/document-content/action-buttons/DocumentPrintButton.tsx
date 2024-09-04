import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';

type Props = {
    contentRef: () => React.ReactInstance | null;
    hidden?: boolean;
};

export default function DocumentPrintButton({
    contentRef,
    hidden
}: Props) {
    if (hidden) return null;
    return (
        <ReactToPrint content={contentRef}>
            <PrintContextConsumer>
                {({ handlePrint }) => (
                    <IconButtonWithTooltip
                        tooltip="core:documents.tooltips.print"
                        onClick={handlePrint}
                        icon={<PrintIcon color="primary" />}
                    />
                )}
            </PrintContextConsumer>
        </ReactToPrint>
    );
}
