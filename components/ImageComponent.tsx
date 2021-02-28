import { BlocksControls, InlineImage } from 'react-tinacms-inline'
import { GridItem, Box } from '@chakra-ui/layout'
import { widths, widthField, paddingField } from './componentUtils'

interface Props {
  index: number
  data: {
    alt: string
    width?: string,
    padding?: string
  }
}

export const ImageComponent = ({ index, data }: Props) => {
  const { width = widths.container.name, padding = 0 } = data
  return (
    <GridItem gridColumn={widths[width].val} padding={padding}>
      <BlocksControls index={index} insetControls label={false}>
        <Box>
          <InlineImage
            name="image"
            parse={media => `/${media.filename}`}
            uploadDir={() => '/'}
            alt={data.alt}
          />
        </Box>
      </BlocksControls>
    </GridItem>
  )
}

export const ImageComponentTemplate = {
  label: 'Image',
  fields: [
    {
      component: 'text',
      name: 'alt',
      label: 'Description about the image'
    },
    widthField,
    paddingField
  ]
}
