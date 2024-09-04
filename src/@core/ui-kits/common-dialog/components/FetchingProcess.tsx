/* eslint-disable import/no-anonymous-default-export */
import { CircularProgress, styled } from '@mui/material';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import React, { ComponentProps } from 'react';

const Wrapper = styled('div')<{ style: React.CSSProperties }>(({ style }) => ({
    height        : '100%',
    display       : 'flex',
    position      : 'relative',
    width         : '100%',
    alignItems    : 'center',
    justifyContent: 'center',
    margin        : '0 auto',
    minHeight     : '200px',
    ...style
}));

type FetchingProcessProps = {
    style?: React.CSSProperties;
};

function FetchingProcess({ style = {} }: FetchingProcessProps) {
    return (
        <Wrapper style={style}>
            <CircularProgress size={30} />
        </Wrapper>
    );
}

type FailedFetchingProps = {
    style?: React.CSSProperties;
} & Partial<Omit<ComponentProps<typeof FallbackContent>, 'icon' | 'styles'>>;

function FailedFetching({
    style = {},
    firstText = 'common:failed_fetch',
    ...props
}: FailedFetchingProps) {
    return (
        <Wrapper style={style}>
            <FallbackContent
                icon={<VectorIcons.Cone />}
                size="medium"
                firstText={firstText}
                {...props}
            />
        </Wrapper>
    );
}

export default {
    /**
     * @description
     * This component is used to show a loading spinner
     * while fetching data from the server
     */
    FetchingProcess,
    FailedFetching
};
