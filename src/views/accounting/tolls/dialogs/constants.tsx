import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import type { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import TollsIcons from '../TollsIcons';

export const selectedVehicleOptions: Options[] = [
    {
        label: 'entity:truck',
        icon : <TollsIcons.TruckIcon />,
        value: DocumentModel_DocumentEntityType.TRUCK
    },
    {
        label: 'entity:trailer',
        icon : <TollsIcons.TrailerIcon />,
        value: DocumentModel_DocumentEntityType.TRAILER
    }
];
