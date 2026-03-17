export interface Agent {
  id: number;
  name: string;
  photo: string;
  rating: number;
  verified: boolean;
  responseTime: number; // seconds
  expert: boolean;
  deals: number;
}

export interface AgentFilters {
  rating: number;
  verified: boolean;
  fastResponse: boolean;
  expert: boolean;
}
