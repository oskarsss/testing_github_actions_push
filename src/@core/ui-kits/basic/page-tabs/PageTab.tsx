import React from 'react';
import { TabProps } from '@mui/material';
import PageTabsStyled from './PageTabs.styled';

type Props = {
    iconExist?: boolean;
} & TabProps;

export default function PageTab(props: Props) {
    return (
        <PageTabsStyled.Tab
            iconExist={props.iconExist ?? false}
            {...props}
        />
    );
}
