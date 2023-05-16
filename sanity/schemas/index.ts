export const schemaTypes = [
  {
    name: 'Restaurant',
    type: 'document',
    title: 'Restaurant', // Add the title property
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
      },
      {name: 'price', type: 'number', title: 'Price'},
      {
        name: 'location',
        type: 'geopoint',
        title: 'Location',
      },
    ],
  },
]
