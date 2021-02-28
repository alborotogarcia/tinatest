export const headerForm = {
  label: 'Header settings',
  fields: [
    {
      label: 'Navigation',
      name: 'header.navigation',
      component: 'group-list',
      description: 'Navigation List',
      itemProps: (item) => ({
        key: item.id,
        label: item.name
      }),
      defaultItem: () => ({
        name: 'New Link',
        link: '/',
        id: Math.random()
          .toString(36)
          .substr(2, 9)
      }),
      fields: [
        {
          label: 'Name',
          name: 'name',
          component: 'text'
        },
        {
          label: 'Link',
          name: 'link',
          component: 'text'
        }
      ]
    }
  ]
}
