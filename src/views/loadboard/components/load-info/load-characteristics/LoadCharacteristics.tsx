import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { LB_ListenSearchResultsReply_SearchResult } from '@proto/loadboard';
import { useAppSelector } from '@/store/hooks';
import { loadboardEquipmentsMapSelector } from '@/store/loadboard/selectors';
import LoadboardIcons from '../../../LoadboardIcons';
import CharacteristicItem from './CharacteristicItem';

type Props = {
    load: LB_ListenSearchResultsReply_SearchResult;
};

function LoadCharacteristics({ load }: Props) {
    const equipmentsMap = useAppSelector(loadboardEquipmentsMapSelector);
    const equipment = equipmentsMap[load.equipment?.equipmentId || ''];

    return (
        <Stack
            direction="column"
            gap={6}
            sx={{
                padding        : '12px',
                backgroundColor: (theme) => theme.palette.semantic.background.white,
                borderRadius   : '5px'
            }}
        >
            <Stack
                direction="column"
                gap={2}
            >
                <Box borderBottom="1px solid #F3F4F6">
                    <Typography
                        fontSize="18px"
                        fontWeight={500}
                    >
                        Info
                    </Typography>
                </Box>
                <CharacteristicItem
                    Icon={<LoadboardIcons.Equipment />}
                    title="Equipment"
                    value={equipment?.name || ''}
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Weight />}
                    title="Weight"
                    value={load.weight ? `${load.weight} lbs` : ''}
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Length />}
                    title="Length"
                    value=""
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.LoadSize />}
                    title="Load size"
                    value=""
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Commodity />}
                    title="Commodity"
                    value=""
                />
            </Stack>
            <Stack
                direction="column"
                gap={2}
            >
                <Box
                    borderBottom="1px solid #F3F4F6"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    gap={5}
                >
                    <Typography
                        fontSize="18px"
                        fontWeight={500}
                    >
                        Broker
                    </Typography>
                    <Typography
                        noWrap
                        fontSize="18px"
                        fontWeight={500}
                    >
                        {load.broker?.name || 'N/A'}
                    </Typography>
                </Box>

                <CharacteristicItem
                    Icon={<LoadboardIcons.Phone />}
                    title="Phone"
                    value={load.broker?.phone || ''}
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Email />}
                    title="Email"
                    value=""
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Number />}
                    title="Dot"
                    value=""
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Number />}
                    title="MC"
                    value={load.broker?.mc || ''}
                />
                <CharacteristicItem
                    Icon={<LoadboardIcons.Pay />}
                    title="Days to pay"
                    value=""
                />
            </Stack>
        </Stack>
    );
}

export default LoadCharacteristics;
