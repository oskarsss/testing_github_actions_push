import { useCallback, useMemo } from 'react';
import TagsGrpcService from '@/@grpcServices/services/tags.service';
import { TagModel_EntityType } from '@proto/models/model_tag';
import { isEqual } from 'lodash';

export function useTags(entityType: keyof typeof TagModel_EntityType) {
    const {
        data,
        ...rest
    } = TagsGrpcService.useGetTagsQuery({});

    const tags = useMemo(() => {
        if (!data?.tags) return [];
        return data.tags.filter((tag) => tag.entityType === TagModel_EntityType[entityType]);
    }, [data?.tags, entityType]);

    return {
        tags,
        ...rest
    };
}

export function useEntityTags(entityType: keyof typeof TagModel_EntityType, entityId: string) {
    const {
        data,
        ...rest
    } = TagsGrpcService.useGetEntityTagQuery(
        {
            entityType: TagModel_EntityType[entityType],
            entityId
        },
        {
            skip: !entityId
        }
    );

    const {
        tags,
        tagIds
    } = useMemo(() => {
        if (!data?.tags) {
            return {
                tags  : [],
                tagIds: []
            };
        }
        return {
            tags  : data.tags,
            tagIds: data.tags.map((tag) => tag.tagId)
        };
    }, [data?.tags]);

    return {
        tags,
        tagIds,
        ...rest
    };
}

export function useUpdateFormTags(entityType: keyof typeof TagModel_EntityType, entityId: string) {
    const [updateTags] = TagsGrpcService.useUpdateEntityTagMutation();
    const { tagIds } = useEntityTags(entityType, entityId);

    const updateFormTags = useCallback(
        (tags: string[]) => {
            if (isEqual(tags, tagIds)) return;
            updateTags({
                entityType: TagModel_EntityType[entityType],
                entityId,
                tagIds    : tags
            });
        },
        [updateTags, entityId, entityType, tagIds]
    );

    return {
        tagIds,
        updateFormTags
    };
}
