import { Skeleton } from '@mui/material';
import { MIN_WIDTH } from '@/@core/components/filters/selects-filters-group/configs';
import { memo } from 'react';

type Props = {
    skeleton_count?: number;
};

const FiltersItemSkeleton = memo(({ skeleton_count = 5 }: Props) => (
    <>
        {Array(skeleton_count)
            .fill(0)
            .map((_, index) => (
                <Skeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    variant="rectangular"
                    width="max(140px, 100%)"
                    height="40px"
                    sx={{
                        maxWidth    : MIN_WIDTH,
                        borderRadius: '6px'
                    }}
                />
            ))}
    </>
));

export default FiltersItemSkeleton;
