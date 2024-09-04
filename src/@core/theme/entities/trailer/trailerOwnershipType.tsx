/* eslint-disable max-len */
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import TrailerOwnershipIcons from '@/@core/theme/entities/trailer/trailerOwnershipTypeIcons';
import React from 'react';

export const TRAILER_OWNERSHIP_TYPE_ICONS: Record<TrailerOwnershipType, React.ReactNode> =
    Object.freeze({
        owned         : <TrailerOwnershipIcons.OwnedIcon />,
        leased        : <TrailerOwnershipIcons.LeasedIcon />,
        owner_operator: <TrailerOwnershipIcons.OwnerOperatorIcon />
    });
