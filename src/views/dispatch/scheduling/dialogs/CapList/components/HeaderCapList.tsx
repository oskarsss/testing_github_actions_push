import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { listDate } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import MenuItem from '@mui/material/MenuItem';
import CapListStyled from '@/views/dispatch/scheduling/dialogs/CapList/styled';
import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCapListDialog } from '../../share-cap-list';

type Props = {
    selectedDate: number;
    setSelectedDate: (date: number) => void;
    onCopyAll: () => void;
    countData: Record<number, number>;
    disabledShareButton?: boolean;
};

export default function HeaderCapList({
    selectedDate,
    setSelectedDate,
    onCopyAll,
    countData,
    disabledShareButton
}: Props) {
    const { t } = useAppTranslation();
    const shareCapListDialog = useCapListDialog();

    const handleOpenShareCapList = () => {
        shareCapListDialog.open({});
    };

    return (
        <CapListStyled.Header.Container>
            <FormControl>
                <InputLabel id="select-Filter">
                    {t('schedule:dialogs.cap_list.header.labels.filter')}
                </InputLabel>
                <Select
                    labelId="select-Filter"
                    value={selectedDate}
                    size="small"
                    label="Filter"
                    onChange={(e) => setSelectedDate(Number(e.target.value))}
                >
                    {listDate.map((item) => (
                        <MenuItem
                            key={item.name}
                            value={item.id}
                            style={{ justifyContent: 'space-between' }}
                        >
                            <span>{t(item.name)}&nbsp;</span>
                            <span>{`[${countData[item.id]}]`}</span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <CapListStyled.Header.Wrapper>
                <CapListStyled.Header.Button
                    variant="outlined"
                    color="primary"
                    startIcon={<VectorIcons.ShareIcon />}
                    onClick={handleOpenShareCapList}
                    disabled={disabledShareButton}
                >
                    {t('common:button.share')}
                </CapListStyled.Header.Button>

                <CapListStyled.Header.Button
                    variant="outlined"
                    color="primary"
                    onClick={onCopyAll}
                    startIcon={<VectorIcons.CopyIcon />}
                    disabled={countData[selectedDate] === 0}
                >
                    {t('schedule:dialogs.cap_list.header.labels.copy_all')}
                </CapListStyled.Header.Button>
            </CapListStyled.Header.Wrapper>
        </CapListStyled.Header.Container>
    );
}
