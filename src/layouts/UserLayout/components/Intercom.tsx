import { IntercomProvider } from 'react-use-intercom';

const INTERCOM_APP_ID = 'mhnikz73';
export default function Intercom() {
    return (
        <IntercomProvider
            appId={INTERCOM_APP_ID}
            autoBoot
        />
    );
}
