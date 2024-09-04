import { OnboardingServiceClient } from '@proto/onboarding.client';
import {
    OnboardingMarkCompletedReply,
    OnboardingMarkCompletedRequest,
    OnboardingGetChecklistReply,
    OnboardingGetChecklistRequest
} from '@proto/onboarding';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const OnboardingService = new OnboardingServiceClient(grpcTransport);

const OnboardingGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getOnboardingChecklist: query<OnboardingGetChecklistReply, OnboardingGetChecklistRequest>({
            queryFn: createPrivateQueryFn(OnboardingService, 'onboardingGetChecklist')
        }),
        markCompleted: mutation<OnboardingMarkCompletedReply, OnboardingMarkCompletedRequest>({
            queryFn: createPrivateQueryFn(OnboardingService, 'onboardingMarkCompleted')
        })
    })
});

export default OnboardingGrpcService;
