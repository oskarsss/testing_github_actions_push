/* eslint-disable import/no-anonymous-default-export */
import { styled } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React from 'react';

const RowContent = styled('div')<{ width?: string }>(({ width = '1500px' }) => ({
    display      : 'flex',
    flexDirection: 'row',
    padding      : '15px 20px',
    width        : `min(${width}, 90vw)`,
    height       : '100%',
    overflowX    : 'auto'
}));

const ColumnContent = styled('div')<{ maxWidth?: string; minWidth?: string }>(
    ({
        maxWidth = '450px',
        minWidth = '450px'
    }) => ({
        display      : 'flex',
        flexDirection: 'column',
        height       : '100%',
        width        : '100%',
        gap          : '15px',
        maxWidth,
        minWidth
    })
);

type PropsScrollColumnContent = {
    maxWidth?: React.CSSProperties['maxWidth'];
    minWidth?: React.CSSProperties['minWidth'];
    children: React.ReactNode;
    styles?: React.CSSProperties;
};

const ScrollColumnContent = ({
    children,
    maxWidth = '450px',
    minWidth = '450px',
    styles = {}
}: PropsScrollColumnContent) => (
    <PerfectScrollbar
        style={{
            maxWidth,
            minWidth,
            width       : '100%',
            paddingRight: '15px',
            ...styles
        }}
        options={{
            wheelSpeed      : 1,
            wheelPropagation: false,
            suppressScrollX : false
        }}
    >
        <ColumnContent
            maxWidth="none"
            minWidth="auto"
        >
            {children}
        </ColumnContent>
    </PerfectScrollbar>
);

export default {
    RowContent,
    ColumnContent,
    ScrollColumnContent
};
