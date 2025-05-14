import type {
  IChatbotFlowResource,
  IChatbotFlow
} from '@/types/chatbotFlow';

function normalizeFlow(res: IChatbotFlowResource): IChatbotFlow {
  const { attributes, relationships } = res;
  return {
    id: attributes.id,
    name: attributes.name,
    slug: attributes.slug,
    description: attributes.description,
    flowData: attributes.flow_data,
    published: attributes.published,
    publishedAt: attributes.published_at,
    createdAt: attributes.created_at,
    updatedAt: attributes.updated_at,
    userId: Number(relationships.user.data.id),
    botId: relationships.bot ? Number(relationships.bot.data.id) : undefined,
  };
}

export {
  normalizeFlow,
}