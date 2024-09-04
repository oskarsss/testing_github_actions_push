import Typography from '@mui/material/Typography';
import CellWithMultipleLines from '@/@core/components/cell-with-multiple-lines/CellWithMultipleLines';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    amountFormatted: string;
    chargedAmount?: string;
    maxTotalAmountFormatted: string;
};

const nonNumberRegex = /\D/g;

function AmountCell({
    amountFormatted,
    chargedAmount,
    maxTotalAmountFormatted
}: Props) {
    const { t } = useAppTranslation('common');

    return (
        <CellWithMultipleLines
            info={amountFormatted}
            subInfo={(
                <>
                    {chargedAmount ? (
                        <>
                            {t('charged')}:
                            <Typography
                                variant="caption"
                                fontWeight="500"
                                fontSize="10px"
                                display="inline"
                                marginLeft="3px"
                                lineHeight="14px"
                                color="semantic.text.primary"
                            >
                                {chargedAmount}
                            </Typography>
                        </>
                    ) : null}
                    {Number(maxTotalAmountFormatted.replace(nonNumberRegex, ''))
                        ? `${chargedAmount ? '/' : ''}${maxTotalAmountFormatted}`
                        : ''}
                </>
            )}
        />
    );
}

export default AmountCell;
