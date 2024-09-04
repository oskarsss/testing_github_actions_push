import { RootState } from '../types';

export const appHideOnboardingSelector = (state: RootState) => state.app.isHideOnboarding;
