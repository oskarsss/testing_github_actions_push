import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { ChangeEvent } from 'react';

type Props = {
    searchValue: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({
    searchValue,
    handleChange
}: Props) {
    const theme = useTheme();

    return (
        <TextField
            variant="standard"
            size="small"
            sx={{
                marginTop: '16px',
                width    : '100%',
                backgroundColor:
                    theme.palette.mode === 'light' ? '#F4F5FA' : 'rgba(255, 255, 255, 0.08)',
                padding             : '0 8px',
                '.MuiInputBase-root': {
                    height: '36px'
                }
            }}
            value={searchValue}
            onChange={handleChange}
            InputProps={{
                disableUnderline: true,
                startAdornment  : (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                sx: {
                    '& .MuiInputBase-input': {
                        padding: '0 !important'
                    }
                }
            }}
            placeholder="Search..."
        />
    );
}
