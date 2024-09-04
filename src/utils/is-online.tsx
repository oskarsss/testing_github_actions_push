import moment, { MomentInput } from 'moment-timezone';

export default function isOnline(timestamp: MomentInput) {
    if (!timestamp || !moment(timestamp).isValid()) return false;
    return moment().diff(moment(timestamp), 'minutes') < 2;
}
