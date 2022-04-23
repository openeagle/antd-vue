export const formParams = [
  {
    type: 'text',
    name: 'text',
    label: 'text',
  },
  {
    type: 'number',
    name: 'number',
    label: 'number',
  },
  {
    type: 'year',
    name: 'year',
    label: 'year',
  },
  {
    type: 'month',
    name: 'month',
    label: 'month',
  },
  {
    type: 'week',
    name: 'week',
    label: 'week',
  },
  {
    type: 'date',
    name: 'date',
    label: 'date',
    controlProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    type: 'dateRange',
    name: 'dateRange',
    label: 'dateRange',
    controlProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    type: 'dateTime',
    name: 'dateTime',
    label: 'dateTime',
  },
  {
    type: 'dateTimeRange',
    name: 'dateTimeRange',
    label: 'dateTimeRange',
    controlProps: {
      style: {
        width: '100%',
      },
    },
  },
  {
    type: 'time',
    name: 'time',
    label: 'time',
  },
  {
    type: 'select',
    name: 'select',
    label: 'select',
    controlProps: {
      allowClear: true,
      placeholder: 'please select your zone',
      options: [
        {
          label: 'Zone one',
          value: 'shanghai',
        },
        {
          label: 'Zone two',
          value: 'beijing',
        },
      ],
    },
  },
]