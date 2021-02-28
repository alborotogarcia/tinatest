export const widths = {
  full: {
    name: 'full',
    val: '1 / -1'
  },
  container: {
    name: 'container',
    val: '2 / 6'
  },
  halfLeft: {
    name: 'halfLeft',
    val: '2/ span 2'
  },
  halfRight: {
    name: 'halfRight',
    val: 'span 2 / 6'
  },
  quarterLeft: {
    name: 'quarterLeft',
    val: '2/ span 1'
  },
  quarterRight: {
    name: 'quarterRight',
    val: 'span 1 / 6'
  },
  threeQuarterLeft: {
    name: 'threeQuarterLeft',
    val: '2 / span 3'
  },
  threeQuarterRight: {
    name: 'threeQuarterRight',
    val: 'span 3 / 6'
  }
}

export const widthField = {
  component: 'select',
  name: 'width',
  label: 'Width',
  options: [
    {
      value: widths.container.name,
      label: 'Main Container'
    },
    {
      value: widths.full.name,
      label: 'Full width'
    },
    {
      value: widths.halfLeft.name,
      label: 'Half width, left aligned'
    },
    {
      value: widths.halfRight.name,
      label: 'Half width, right aligned'
    },
    {
      value: widths.quarterLeft.name,
      label: 'Quarter width, left aligned'
    },
    {
      value: widths.quarterRight.name,
      label: 'Quarter width, right aligned'
    },
    {
      value: widths.threeQuarterLeft.name,
      label: 'Three quarters width, left aligned'
    },
    {
      value: widths.threeQuarterRight.name,
      label: 'Three quarters width, right aligned'
    }
  ]
}

export const paddingField = {
  name: 'padding',
  component: 'select',
  label: 'Content padding',
  description: 'Select amount of padding for the content',
  options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96]
}
