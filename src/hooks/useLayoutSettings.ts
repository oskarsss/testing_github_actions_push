import { useContext } from 'react';
import { LayoutSettingsContext } from '../context/LayoutSettingsContext';

// eslint-disable-next-line import/prefer-default-export
export const useLayoutSettings = () => useContext(LayoutSettingsContext);
