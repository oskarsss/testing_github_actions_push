import { useMemo } from 'react';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';
import { FilledInput, MenuItem } from '@mui/material';
import { formatDate } from '@/views/reports/ifta/components/Years/Periods/Periods';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IftaGrpcService from '@/@grpcServices/services/ifta.service';
import navigateToPage from '@/utils/navigateToPage';
import SelectStyled from './styled';

type Props = {
    id: string;
};

export default function IftaSelect({ id }: Props) {
    const { data } = IftaGrpcService.useGetIftaPeriodsQuery({});

    const selectPeriod = useMemo(
        () =>
            data &&
            data.years.length > 0 &&
            data.years[0].periods.find((period) => period.periodId === id),
        [data, id]
    );

    if (!selectPeriod) {
        return null;
    }

    const selectHandleChange = (event: SelectChangeEvent<string>) => {
        navigateToPage(`/reports/ifta/${event.target.value}`);
    };

    const renderInput = () => (
        <FilledInput
            startAdornment={(
                <SelectStyled.StartAdornment>
                    <CalendarTodaySharpIcon color="secondary" />
                </SelectStyled.StartAdornment>
            )}
        />
    );

    const renderMenuItems = () =>
        data &&
        data.years.length > 0 &&
        data.years[0].periods.map((period) => (
            <MenuItem
                key={period.periodId}
                value={period.periodId}
                sx={{
                    paddingTop   : '8px',
                    paddingBottom: '8px'
                }}
            >
                <SelectStyled.Quarter>{period.name}</SelectStyled.Quarter>
                {`-  ${formatDate(period.startDate)} - ${formatDate(period.endDate)}`}
            </MenuItem>
        ));

    return (
        <SelectStyled.Wrapper>
            <SelectStyled.FormControl>
                <Select
                    labelId="select-filled-label"
                    id="select-input"
                    value={selectPeriod && selectPeriod.periodId}
                    onChange={selectHandleChange}
                    size="small"
                    input={renderInput()}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                '.MuiList-root': {
                                    padding: 0
                                }
                            }
                        }
                    }}
                >
                    {renderMenuItems()}
                </Select>
            </SelectStyled.FormControl>
        </SelectStyled.Wrapper>
    );
}
