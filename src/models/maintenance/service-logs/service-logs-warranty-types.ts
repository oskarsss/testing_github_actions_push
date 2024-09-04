export const serviceLogsWarrantyType = Object.freeze({
    COVERED    : 'covered',
    NOT_COVERED: 'not_covered'
});

export type ServiceLogsWarrantyTypes =
    (typeof serviceLogsWarrantyType)[keyof typeof serviceLogsWarrantyType];
