import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import { IconButton, Skeleton } from '@mui/material';
import * as React from 'react';

const icon_skeleton = (
    <IconButton disabled>
        <Skeleton
            variant="circular"
            width="10px"
            height="10px"
        />
    </IconButton>
);
const label_skeleton = (
    <Skeleton
        variant="rectangular"
        width="65px"
        height="17px"
        sx={{
            borderRadius: '2px'
        }}
    />
);

type Props = {

    // 3 is the default value
    skeleton_count?: number;
};

export default function ViewsSkeleton({ skeleton_count = 3 }: Props) {
    return (
        <>
            {Array(skeleton_count)
                .fill(0)
                .map((_, index) => (
                    <PageTab
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        disabled
                        iconExist={false}
                        iconPosition="end"
                        icon={icon_skeleton}
                        label={label_skeleton}
                    />
                ))}
        </>
    );
}
