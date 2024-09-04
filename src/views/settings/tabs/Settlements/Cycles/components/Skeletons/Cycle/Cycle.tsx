import { CyclePaper, DescriptionWrapper } from '@/views/settings/components/styled';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import SKELETON_OPTIONS from '@/views/settings/tabs/Settlements/Cycles/components/Skeletons/options/skeleton_options';
import { Skeleton } from '@mui/material';
import HeaderSkeleton from './Header';
import InfoSkeleton from './Info';
import TableSkeleton from './Table';

export default function Cycle() {
    return (
        <CyclePaper elevation={0}>
            <HeaderSkeleton />
            <PageHeadersKit.Divider
                sx={{
                    width : '100%',
                    height: '1px'
                }}
            />
            <DescriptionWrapper>
                {SKELETON_OPTIONS.description.map((el, index) => (
                    <Skeleton
                        // eslint-disable-next-line max-len
                        // eslint-disable-next-line react/jsx-props-no-multi-spaces,react/no-array-index-key
                        key={index}
                        variant="text"
                        width={el.width}
                        sx={el.sx}
                    />
                ))}
            </DescriptionWrapper>
            <InfoSkeleton />
            <TableSkeleton />
        </CyclePaper>
    );
}
