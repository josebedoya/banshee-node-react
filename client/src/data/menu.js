const urlBase = '/app';

export default [
  {
    key: 'home',
    title: 'Home',
    path: `${urlBase}`,
    icon: 'home'
  },
  {
    key: 'clients',
    title: 'Clients',
    path: `${urlBase}/clients`,
    icon: 'team',
    sub: [
      {
        key: 'client-new',
        title: 'Add a new client',
        path: `${urlBase}/clients/new`
      },
      {
        key: 'clients-list',
        title: 'List of clients',
        path: `${urlBase}/clients`
      }
    ]
  },
  {
    key: 'agents',
    title: 'Agents',
    path: `${urlBase}/agents`,
    icon: 'form',
    sub: [
      {
        key: 'agents-new',
        title: 'Add a new agent',
        path: `${urlBase}/agents/new`
      },
      {
        key: 'agents-list',
        title: 'List of agents',
        path: `${urlBase}/agents`
      }
    ]
  },
  {
    key: 'reports',
    title: 'Reports',
    path: `${urlBase}/reports`,
    icon: 'line-chart'
  }
];
