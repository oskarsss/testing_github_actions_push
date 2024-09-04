import { memo } from 'react';
import { Stack, styled } from '@mui/material';
import DriversTypes from '@/store/fleet/drivers/types';
import { useEntityTags } from '@/store/tags/hooks';

const Tag = styled('span')({
    width          : 'auto',
    backgroundColor: 'rgba(58, 53, 65, 0.08)',
    color          : 'rgba(58, 53, 65, 0.87)',
    borderRadius   : '16px',
    height         : 26,
    paddingLeft    : 15,
    paddingRight   : 15,
    display        : 'flex',
    flexDirection  : 'row',
    justifyContent : 'center',
    alignItems     : 'center'
});

type Props = {
    driverId: DriversTypes.ConvertedDriverRow['driverId'];
};

function Tags({ driverId }: Props) {
    const { tags } = useEntityTags('DRIVER', driverId);

    return (
        <Stack
            direction="row"
            alignItems="center"
            height="100%"
            gap="5px"
            hidden
        >
            {tags.map((tag) => (
                <Tag key={tag.tagId}>{tag.name}</Tag>
            ))}
        </Stack>
    );
}

export default memo(Tags);
