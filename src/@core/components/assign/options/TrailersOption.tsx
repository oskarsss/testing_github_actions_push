import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import TrailersTypes from '@/store/fleet/trailers/types';
import ListItem from '@mui/material/ListItem';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { memo } from 'react';
import AssignTypes from '@/@core/components/assign/types';

type Props = AssignTypes.OptionProps<TrailersTypes.ConvertedTrailerRow>;

const TrailerItem = ({
    option,
    onClickOption,
    selectedOptionId,
    onKeyDown,
    setOptionRef
}: Props) => {
    const { t } = useAppTranslation('common');

    return (
        <ListItem
            tabIndex={0}
            onKeyDown={onKeyDown}
            ref={setOptionRef}
            onClick={() => onClickOption(option)}
            selected={selectedOptionId === option.trailerId}
            disabled={selectedOptionId === option.trailerId}
        >
            <Stack
                direction="column"
                paddingY={2}
                paddingX={1}
                width="100%"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                >
                    {option.trailerType?.name || ''}

                    <Typography
                        variant="body1"
                        fontWeight={600}
                    >
                        #{option.referenceId}
                    </Typography>

                    {getTrailerTypeIcon(option.trailerType?.icon || 0)}

                    <Typography variant="body1">{option.year || ''}</Typography>

                    <Typography variant="body1">{option.model}</Typography>
                </Stack>

                {option.parkingLocation && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                    >
                        <LocationSearchingOutlinedIcon fontSize="small" />

                        <Typography variant="body1">
                            {t('location')}: {option.parkingLocation}
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </ListItem>
    );
};

export default memo(TrailerItem);
