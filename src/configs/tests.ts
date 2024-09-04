/* eslint-disable import/prefer-default-export */
import CyLocators from '../../cypress/configs/locators';
import { TestKey } from '../../cypress/configs/constants';

/** e2e test ids for DOM-elements */
export const TestIDs = CyLocators;

export function applyTestId<T extends string>(testId?: T): { [TestKey]: T } | object {
    if (!testId) return {};

    return { [TestKey]: testId };
}

export { TestKey };
