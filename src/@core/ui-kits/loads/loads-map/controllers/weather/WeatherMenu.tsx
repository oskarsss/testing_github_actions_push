import {
    Fade,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { weather_config } from '@/views/map/controllers/WeatherControl';
import {
    useAdvancedWeatherSettings,
    WeatherControlField
} from '@/hooks/map-hooks/useWeatherSettings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ChangeEvent } from 'react';

type Props = {
    storageKey: string;
    changeMapWeather: (selected: WeatherControlField) => void;
    onClose: () => void;
};

export default function WeatherMenu({
    storageKey,
    changeMapWeather,
    onClose
}: Props) {
    const [weather, setWeather] = useAdvancedWeatherSettings(storageKey);
    const { t } = useAppTranslation();

    const handleChangeWeather = (_: ChangeEvent<HTMLInputElement>, value: string) => {
        setWeather({
            selected : value as WeatherControlField,
            timestamp: 0
        });
        changeMapWeather(value as WeatherControlField);
    };
    return (
        <Stack
            padding="20px 4px 20px 20px"
            borderRadius="12px"
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.background.white,
                pointerEvents  : 'auto'
            }}
        >
            <IconButton
                sx={{ position: 'absolute', top: 4, right: 4 }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <Typography
                variant="body1"
                color="text.primary"
                fontWeight={600}
                marginBottom="8px"
            >
                {`${t('core:basic.load.map.weather_menu.title')}:`}
            </Typography>
            <RadioGroup
                name="radio-buttons-group"
                value={weather.selected}
                onChange={handleChangeWeather}
                sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    flexWrap : 'nowrap'
                }}
            >
                {weather_config.map(({
                    field,
                    label,
                    description
                }) => (
                    <Tooltip
                        title={t(description)}
                        disableInteractive
                        key={field}
                    >
                        <FormControlLabel
                            value={field}
                            control={<Radio />}
                            label={t(label)}
                        />
                    </Tooltip>
                ))}
                <FormControlLabel
                    value=""
                    control={<Radio />}
                    label={t('core:basic.load.map.weather_menu.options.turn_off')}
                    sx={{
                        '.MuiFormControlLabel-label': {
                            whiteSpace: 'nowrap'
                        }
                    }}
                />
            </RadioGroup>
        </Stack>
    );
}
