import { uuidv4 } from './uuidv4';

export default function getDeviceId() {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId || !deviceId.length) {
        deviceId = uuidv4();
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
}
