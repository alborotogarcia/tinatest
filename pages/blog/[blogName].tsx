import { Layout } from '@/components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { usePlugin, ModalProvider } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { GitFile } from 'react-tinacms-github/dist/src/form/useGitFileSha'
import { useRouter } from 'next/router'
import { fileToUrl } from '@/utils/fileToUrl'
import { getLocalFiles } from '@/utils/getLocalFiles'
// import { useCreatePage } from '@/utils/useCreatePage'
import { useCreateBlogPage } from '@/utils/useCreateBlogPage'
import { ButtonComponent, ButtonComponentTemplate } from '@/components/ButtonComponent'
import { ImageComponent } from '@/components/Image'
import { ImageComponentTemplate } from '@/components/ImageComponent'
import { TextContent, TextContentTemplate } from '@/components/TextContent'
import { GridContainer } from '.'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { getGlobalStaticProps } from '@/utils/getGlobalStaticProps'

const formOptions = {
  label: 'Blog',
  fields: [
    { name: 'title', component: 'text' }
  ]
}

interface Props {file: GitFile, allBlogs: string[], global: any}

export default function Blog ({ file, allBlogs, global }: Props) {
  useCreateBlogPage(allBlogs)
  const router = useRouter()
  if (!file) {
    return (
      <Layout global={global}>
        <Box maxW='xl' justifyContent='center' m='auto' p='3'>
          <Text>No file was found, please check if the build has completed</Text>
        </Box>
      </Layout>
    )
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const [, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  return (
    <Layout global={global}>
      <ModalProvider>
        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={BLOG_BLOCKS as any} components={{
            Container: GridContainer
          }} />
        </InlineForm>
      </ModalProvider>
    </Layout>
  )
}

const BLOG_BLOCKS = {
  textContent: {
    Component: TextContent,
    template: TextContentTemplate
  },
  image: {
    Component: ImageComponent,
    template: ImageComponentTemplate
  },
  button: {
    Component: ButtonComponent,
    template: ButtonComponentTemplate
  }
}

// /**
//  * Fetch data with getStaticProps based on 'preview' mode
//  */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const allBlogs = (await getLocalFiles('content/blog') || []).map((fileName) => fileName.replace('content/blog/', '').replace('.json', ''))
  const global = await getGlobalStaticProps(preview, previewData)
  const { blogName } = params
  const fileRelativePath = `content/blog/${blogName}.json`
  if (preview) {
    try {
      const previewProps = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
      return {
        props: {
          global,
          allBlogs,
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          ...previewProps.props
        }
      }
    } catch (e) {
      return {
        props: {
          global,
          allBlogs,
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          file: {
            fileRelativePath,
            data: null
          }
        }
      }
    }
  }

  const content = (await import(`@/content/blog/${blogName}.json`)).default

  return {
    props: {
      global,
      allBlogs,
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath,
        data: content
      }
    }
  }
}

export const getStaticPaths = async function () {
  const fg = require('fast-glob')
  const contentDir = 'content/blog'
  const files = await fg(`${contentDir}/*.json`)
  const paths = files
    .filter((file) => !file.endsWith('index.json'))
    .map((file) => {
      const slug = fileToUrl(file, contentDir)
      return { params: { blogName: slug } }
    })
  return {
    fallback: true,
    paths
  }
}
