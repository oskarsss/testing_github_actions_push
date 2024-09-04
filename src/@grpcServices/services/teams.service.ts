import {
    TeamCreateReply,
    TeamCreateRequest,
    TeamDeleteReply,
    TeamDeleteRequest,
    TeamDriverDeleteReply,
    TeamDriverDeleteRequest,
    TeamsGetReply,
    TeamsGetRequest,
    TeamRetrieveReply,
    TeamRetrieveRequest,
    TeamTrailerDeleteReply,
    TeamTrailerDeleteRequest,
    TeamTruckDeleteReply,
    TeamUpdateReply,
    TeamUpdateRequest,
    TeamTruckDeleteRequest,
    TeamUserDeleteReply,
    TeamUserDeleteRequest,
    TeamDriversCreateReply,
    TeamDriversCreateRequest,
    TeamLogoUpdateReply,
    TeamLogoUpdateRequest,
    TeamTrailersCreateReply,
    TeamTrailersCreateRequest,
    TeamTrucksCreateReply,
    TeamTrucksCreateRequest,
    TeamUsersCreateReply,
    TeamUsersCreateRequest
} from '@proto/teams';
import { TeamsServiceClient } from '@proto/teams.client';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new TeamsServiceClient(grpcTransport);

const TeamsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        updateTeamLogoUrl: mutation<TeamLogoUpdateReply, TeamLogoUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamLogoUpdate'),
            invalidatesTags: ['team', 'teams']
        }),
        createTeam: mutation<TeamCreateReply, TeamCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamCreate'),
            invalidatesTags: ['teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Create Team',
                    success: 'Team was created'
                });
            }
        }),
        retrieveTeam: query<TeamRetrieveReply, TeamRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'teamRetrieve'),
            providesTags: ['team']
        }),
        getTeams: query<TeamsGetReply, TeamsGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'teamsGet'),
            providesTags: ['teams']
        }),
        updateTeam: mutation<TeamUpdateReply, TeamUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamUpdate'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Team',
                    success: 'Team was updated'
                });
            }
        }),
        deleteTeam: mutation<TeamDeleteReply, TeamDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamDelete'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Team',
                    success: 'Team was deleted'
                });
            }
        }),

        createTeamDriver: mutation<TeamDriversCreateReply, TeamDriversCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamDriversCreate'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Team Driver',
                    success: 'Team Driver was added'
                });
            }
        }),

        deleteTeamDriver: mutation<TeamDriverDeleteReply, TeamDriverDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamDriverDelete'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Team Driver',
                    success: 'Team Driver was deleted'
                });
            }
        }),

        createTeamTruck: mutation<TeamTrucksCreateReply, TeamTrucksCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamTrucksCreate'),
            invalidatesTags: ['team', 'teams'],
            onQueryStarted : (arg, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Team Truck',
                    success: 'Team Truck was added'
                });
            }
        }),

        deleteTeamTruck: mutation<TeamTruckDeleteReply, TeamTruckDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamTruckDelete'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Team Truck',
                    success: 'Team Truck was deleted'
                });
            }
        }),

        createTeamTrailer: mutation<TeamTrailersCreateReply, TeamTrailersCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamTrailersCreate'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Team Trailer',
                    success: 'Team Trailer was added'
                });
            }
        }),

        deleteTeamTrailer: mutation<TeamTrailerDeleteReply, TeamTrailerDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamTrailerDelete'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Team Trailer',
                    success: 'Team Trailer was deleted'
                });
            }
        }),

        createTeamUser: mutation<TeamUsersCreateReply, TeamUsersCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamUsersCreate'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Team User',
                    success: 'Team User was added'
                });
            }
        }),

        deleteTeamUser: mutation<TeamUserDeleteReply, TeamUserDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'teamUserDelete'),
            invalidatesTags: ['team', 'teams'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Team User',
                    success: 'Team User was deleted'
                });
            }
        })
    })
});

export default TeamsGrpcService;
