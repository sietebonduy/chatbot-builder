export interface IChatbotFlow {
  id: number;
  name: string;
  slug: string;
  description: string;
  flowData: {
    nodes: any[];
    edges: any[];
  };
  userId: number;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
