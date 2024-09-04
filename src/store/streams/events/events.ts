// import { useEffect, useState } from 'react';

import grpcTransport from '@/@grpcServices/grpcTransport';
import { EventsServiceClient } from '@proto/events_serv.client';

export const EventsService = new EventsServiceClient(grpcTransport);
