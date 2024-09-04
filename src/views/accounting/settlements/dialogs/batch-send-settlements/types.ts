namespace BatchSendSettlements {
    export type SendItem = {
        recipient: 'driver' | 'vendor';
        email: string;
        phoneNumber: string;
        settlementId: string;
        driverId: string;
        vendorId: string;
        settlementFriendlyId: number;
    };

    export type SendingItem = SendItem & {
        status: 'pending' | 'success' | 'failed';
        errorText?: string;
    };

    export type DefaultValues = {
        subject: string;
        body: string;
        sends: SendItem[];
    };
}
export default BatchSendSettlements;
