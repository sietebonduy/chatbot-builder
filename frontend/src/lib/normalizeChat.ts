import {
  IChat,
  IChatAttributes,
  IClientAttributes,
  IBotAttributes,
  IMessageAttributes,
  IJSONAPIReference,
  IJSONAPIResource,
} from '@/types/chat';

export function normalizeChatResource(
  resource: IJSONAPIResource<IChatAttributes>,
  included: IJSONAPIResource[]
): IChat {
  const { attributes, relationships } = resource;
  const find = <T>(type: string, id: string): T => {
    const item = included.find((i) => i.type === type && i.id === id);
    if (!item) throw new Error(`Missing included ${type}:${id}`);
    return item.attributes as T;
  };

  const clientRef = relationships!.client!.data as IJSONAPIReference;
  const botRef    = relationships!.bot!.data    as IJSONAPIReference;
  const msgRefs   = relationships!.messages!.data as IJSONAPIReference[];

  return {
    id: attributes.id,
    createdAt: attributes.created_at,
    updatedAt: attributes.updated_at,
    client:   find<IClientAttributes>('client', clientRef.id),
    bot:      find<IBotAttributes>('bot',    botRef.id),
    messages: msgRefs
      .map((r) => find<IMessageAttributes>('message', r.id))
      .sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
  };
}

export function normalizeChatsBatch(
  resources: IJSONAPIResource<IChatAttributes>[],
  included: IJSONAPIResource[]
): IChat[] {
  return resources.map((r) => normalizeChatResource(r, included));
}
