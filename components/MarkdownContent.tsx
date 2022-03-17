import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
// import gfm from 'remark-gfm'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
// import { BlocksControls } from 'react-tinacms-inline'
// import { InlineWysiwyg } from 'react-tinacms-editor'
// import { Box, GridItem } from '@chakra-ui/layout'
// import { Property } from 'csstype'
// import { widths, widthField, paddingField } from './componentUtils'
import { MarkdownBody, MarkdownData } from '@/types/markdown'

type PropData = {
  frontmatter: MarkdownData
  markdownBody: MarkdownBody
}

export default function MarkdownContent ({ frontmatter, markdownBody }: PropData) {
  return (
    <ReactMarkdown
      // plugins={ [gfm] }
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      children={markdownBody}
      components={{
        a: ({ children, href }) => {
          return <Link href={href}><a>{children}</a></Link>
        }
      }}
    />
  )
}

export const MarkdownContentTemplate = {
  label: 'Markdown content',
  defaultItem: {
    markdownBody: '### This is a markdown test'
  },
  fields: [
    {
      component: 'test',
      name: 'title',
      label: 'Title'
    },
    {
      component: 'text',
      name: 'date',
      label: 'Date'
    },
    {
      component: 'text',
      name: 'author',
      label: 'Author'
    },
    {
      component: 'text',
      name: 'excerpt',
      label: 'Excerpt'
    },
    {
      component: 'text',
      name: 'markdownBody',
      label: 'Markdown'
    }
  ]
}
