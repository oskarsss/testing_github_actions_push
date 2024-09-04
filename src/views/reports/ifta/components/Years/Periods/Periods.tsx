import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DownloadIcon from '@mui/icons-material/Download';
import navigateToPage from '@/utils/navigateToPage';
import { GetPeriodsReply_Years } from '@proto/ifta';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ButtonsBlock, DataBlock, Indicator, List, ListItem, Tax } from '../styled';

export const formatDate = (date: string | undefined) => {
    const arr = date && date.replace(/-/g, '/').split('/');

    return arr ? `${arr[1]}/${arr[2].slice(0, 2)}/${arr[0].slice(2)}` : '';
};

type Props = {
    year: GetPeriodsReply_Years;
};

export default function Periods({ year }: Props) {
    const { t } = useAppTranslation();

    return (
        <List>
            {year.periods.map((period) => (
                <ListItem key={period.periodId}>
                    <Indicator />

                    <DataBlock>
                        <Typography
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            variant="body1"
                            width="56px"
                            height="56px"
                            fontSize="24px"
                            color="semantic.foreground.brand.primary"
                            bgcolor="semantic.foreground.brand.secondary"
                        >
                            {period.name}
                        </Typography>

                        <Typography variant="h5">
                            {`${formatDate(period.startDate)} - ${formatDate(period.endDate)}`}
                        </Typography>
                    </DataBlock>

                    <Tax>
                        <Typography
                            mb="20px"
                            variant="body2"
                        >
                            {t('ifta:period.new_tax_owned')}
                        </Typography>

                        <Typography variant="h4">{`${period.nextTaxOwed}` || '$0'}</Typography>
                    </Tax>

                    <ButtonsBlock>
                        <LoadingButton
                            variant="contained"
                            startIcon={<FileCopyIcon />}
                            onClick={(e) => {
                                navigateToPage(`/reports/ifta/${period.periodId}`, e);
                            }}
                        >
                            {t('ifta:buttons.view_report')}
                        </LoadingButton>

                        <LoadingButton
                            variant="contained"
                            startIcon={<DownloadIcon />}
                        >
                            {t('common:button.download')}
                        </LoadingButton>
                    </ButtonsBlock>
                </ListItem>
            ))}
        </List>
    );
}
