import { LoadModel_Stop_Status } from '@proto/models/model_load';

export function isActiveStop(stopStatus: LoadModel_Stop_Status): boolean {
    return [
        LoadModel_Stop_Status.canceled,
        LoadModel_Stop_Status.tonu,
        LoadModel_Stop_Status.completed
    ].includes(stopStatus);
}
