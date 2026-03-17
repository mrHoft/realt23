interface MainMenuItem {
  id: string;
  label: string;
  route: string;
}

interface MainMenuCategory {
  id: string;
  label: string;
  fields: MainMenuItem[];
}

export const MAIN_MENU: MainMenuCategory[] = [
  {
    id: 'sellers',
    label: 'Продавцам',
    fields: [
      {
        id: 'new_lot',
        label: 'Добавить объявление',
        route: '/new_lot'
      },
      {
        id: 'rating',
        label: 'Рейтинг агентов',
        route: '/rating'
      },
    ]
  },
  {
    id: 'buyers',
    label: 'Покупателям',
    fields: [
      {
        id: 'catalog',
        label: 'Каталог недвижимости',
        route: '/catalog'
      },
      {
        id: 'developers',
        label: 'Застройщики',
        route: '/developers'
      },
      {
        id: 'agencies',
        label: 'Агентства недвижимости',
        route: '/agencies'
      },
    ]
  }
];
