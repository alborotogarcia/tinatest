import { BlocksControls, InlineText } from 'react-tinacms-inline'
import { GridItem } from '@chakra-ui/layout'
import { widths, widthField, paddingField } from './componentUtils'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { Property } from 'csstype'

interface Props {
  index: number
  data: {
    alt: string
    width?: string,
    buttonAlign?: Property.TextAlign
    buttonLink?: string,
    padding?: string,
    bgColor?: string,
    textColor?: string,
    isFullWidth?: boolean,
    buttonSize?: string,
    variant?: string
  }
}

export const ButtonComponent = ({ index, data }: Props) => {
  const { width = widths.container.name, buttonLink = '/', padding = '3', buttonAlign = 'center', bgColor, textColor, isFullWidth, buttonSize = 'md', variant = 'solid' } = data
  return (
    <GridItem gridColumn={widths[width].val} p={padding} textAlign={buttonAlign}>
      <BlocksControls index={index} insetControls label={false}>
        <Link href={buttonLink} key={index} passHref>
          <Button bgColor={bgColor} textColor={textColor} isFullWidth={isFullWidth} size={buttonSize} variant={variant} padding={2}>
            <InlineText name="buttonText" />
          </Button>
        </Link>
      </BlocksControls>
    </GridItem>
  )
}

export const ButtonComponentTemplate = {
  label: 'Button',
  defaultItem: {
    buttonText: 'Button Text',
    link: '/',
    padding: '3',
    width: widths.container.name
  },
  fields: [
    {
      component: 'text',
      name: 'link',
      label: 'Button Link'
    },
    {
      component: 'text',
      name: 'buttonText',
      label: 'Button Text'
    },
    {
      component: 'color',
      name: 'bgColor',
      label: 'Button Background Colour'
    },
    {
      component: 'color',
      name: 'textColor',
      label: 'Button Text Colour'
    },
    {
      name: 'isFullWidth',
      component: 'toggle',
      label: 'Button is Full width'
    },
    {
      component: 'select',
      name: 'buttonAlign',
      label: 'Button Alignment',
      options: ['Left', 'center', 'right']
    },
    {
      component: 'select',
      name: 'variant',
      label: 'Button Style Variant',
      options: [
        {
          value: 'solid',
          label: 'Solid button'
        },
        {
          value: 'ghost',
          label: 'Transparent background button except on hover'
        },
        {
          value: 'outline',
          label: 'Just outline of button button'
        },
        {
          value: 'link',
          label: 'Plain Link Button'
        }
      ]
    },
    {
      component: 'select',
      name: 'buttonSize',
      label: 'Button Size',
      options: [
        {
          value: 'md',
          label: 'Medium'
        },
        {
          value: 'lg',
          label: 'Large'
        },
        {
          value: 'sm',
          label: 'Small'
        },
        {
          value: 'xs',
          label: 'Extra Small'
        }
      ]
    },
    widthField,
    paddingField
  ]
}
