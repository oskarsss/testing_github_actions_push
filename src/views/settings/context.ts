import * as React from 'react';

interface IProps {
    updateScroll?: () => void;
}

const defaultValue: IProps = {};

export default React.createContext(defaultValue);
