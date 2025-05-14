import type { IBotResource, IBot } from "@/types/bot";

export function normalizeBot(res: IBotResource): IBot {
  const a = res.attributes;
  return {
    id: a.id,
    name: a.name,
    username: a.username,
    avatarUrl: a.avatarUrl,
    provider: a.provider,
    token: a.token,
    userId: a.userId,
    extra: a.extra,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
    isActive: a.isActive,
    webhookUrl: a.webhookUrl,
    webhookSetAt: a.webhookSetAt,
    lastUsedAt: a.lastUsedAt,
    defaultReply: a.defaultReply,
    defaultResponse: a.defaultResponse,
    messageCount: a.messageCount,
    errorCount: a.errorCount,
  };
}
