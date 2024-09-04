import { styled } from '@mui/material/styles';
import { Box, Skeleton } from '@mui/material';

export const StyledBoxSkeleton = styled(Skeleton)(() => ({
    width : '36px',
    height: '36px'
}));
export const TitleSkeleton = styled(Skeleton)(() => ({
    fontSize: '16px',
    width   : '90px'
}));
export const SubtitleSkeleton = styled(Skeleton)(() => ({
    fontSize: '12px',
    width   : '60px'
}));
export const TotalSubtitleSkeleton = styled(Skeleton)(() => ({
    fontSize : '14px',
    textAlign: 'center'
}));
export const StyledBox = styled(Box)(() => ({
    padding   : '6px 10px',
    fontWeight: 700,
    width     : 'max-content'
}));
