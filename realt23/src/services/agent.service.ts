import { Injectable } from '@angular/core';
import type { Agent, AgentFilters } from '../interfaces/agent.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private dummyAgentsData: Agent[] = [
    {
      id: 1,
      name: 'Дмитрий Кузнецов',
      photo: '/avatar/a042581f4e29026024d.jpg',
      rating: 5,
      verified: true,
      responseTime: 7200,
      expert: true,
      deals: 58
    },
    {
      id: 2,
      name: 'Ирина Кокина',
      photo: '/avatar/a04258114e29026303d.jpg',
      rating: 5,
      verified: true,
      responseTime: 3600,
      expert: true,
      deals: 126
    },
    {
      id: 3,
      name: 'Светлана Ковалева',
      photo: '/avatar/a042581f4e29026704d.jpg',
      rating: 5,
      verified: true,
      responseTime: 10800,
      expert: true,
      deals: 320
    },
    {
      id: 4,
      name: 'Татьяна Николаева',
      photo: '/avatar/a04258114e29026305d.jpg',
      rating: 4,
      verified: true,
      responseTime: 3600,
      expert: true,
      deals: 65
    },
    {
      id: 5,
      name: 'Игорь Смирнов',
      photo: '/avatar/a04258114e29026302d.jpg',
      rating: 5,
      verified: true,
      responseTime: 3600,
      expert: true,
      deals: 30
    },
    {
      id: 6,
      name: 'Анна Волкова',
      photo: '/avatar/a04258114e29026304d.jpg',
      rating: 4,
      verified: true,
      responseTime: 10800,
      expert: false,
      deals: 24
    },
  ];

  getAgents(filters?: AgentFilters): Promise<Agent[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.dummyAgentsData];

        if (filters) {
          if (filters.rating) {
            filtered = filtered.filter(p => p.rating >= filters.rating);
          }
          if (filters.verified) {
            filtered = filtered.filter(p => p.verified);
          }
          if (filters.fastResponse) {
            filtered = filtered.filter(p => p.responseTime <= 3600);
          }
          if (filters.expert) {
            filtered = filtered.filter(p => p.expert);
          }
        }
        resolve(filtered);
      }, 500);
    });
  }

  getAgentById(id: number): Promise<Agent | undefined> {
    return Promise.resolve(
      this.dummyAgentsData.find(p => p.id === id)
    );
  }
}
