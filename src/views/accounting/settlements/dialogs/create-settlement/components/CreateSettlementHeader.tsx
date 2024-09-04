import { InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const SearchField = styled(TextField)(() => ({
    height: '48px',
    width : '300px',

    '.MuiInputBase-root': {
        borderRadius: '8px'
    },

    '.MuiInputBase-input': {
        padding: '12px 0px'
    },

    '.MuiInputAdornment-root': {
        marginTop: '0px !important'
    }
}));

type Props = {
    search: string;
    setSearch: (value: string) => void;
};

export default function CreateSettlementHeader({
    search,
    setSearch
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="20px"
        >
            <Typography
                fontSize="24px"
                lineHeight="29px"
                fontWeight={600}
            >
                {t('modals:settlements.create_settlement.title')}
            </Typography>

            <SearchField
                fullWidth
                value={search}
                autoComplete="off"
                placeholder={t('fields:search.placeholder_2')}
                variant="filled"
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    disableUnderline: true,
                    startAdornment  : (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {search && (
                                <IconButtonWithTooltip
                                    padding="4px"
                                    tooltip="fields:search.buttons.clear_search"
                                    onClick={() => setSearch('')}
                                    icon={<ClearIcon sx={{ fontSize: '20px' }} />}
                                />
                            )}
                        </InputAdornment>
                    )
                }}
            />
        </Stack>
    );
}
