
import { useCMS, usePlugins } from 'tinacms'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { FORM_ERROR } from 'final-form'
import { removeInvalidChars } from './removeInvalidChars'
import { setCachedFormData, getCachedFormData } from './formCache'

export const useCreateBlogPage = (allBlogs = []) => {
  const router = useRouter()
  const cms = useCMS()
  usePlugins([
    {
      __type: 'content-creator',
      name: 'Make a new blog',
      // @ts-ignore
      fields: [
        {
          name: 'title',
          label: 'Title',
          component: 'text',
          required: true,
          validate (value) {
            if (!value) {
              return 'A title is required'
            }
            if (allBlogs.includes(value.toLowerCase())) {
              return 'Sorry the blog title must be unique'
            }
          }
        },
        {
          name: 'description',
          label: 'Description',
          component: 'textarea',
          required: true
        },
        {
          name: 'date',
          label: 'Created at',
          component: 'date',
          dateFormat: 'DD MM YYYY',
          timeFormat: false
        },
        {
          label: 'Feature Image',
          name: 'featureImg',
          component: 'image',
          parse: (media) => `/${media.filename}`,
          uploadDir: () => '/',
          required: true
        },
        {
          name: 'publish',
          label: 'Publish the blog to go live?',
          component: 'toggle',
          default: false
        }
      ],
      onSubmit: async (frontMatter) => {
        const github = cms.api.github
        const fileName = removeInvalidChars(slugify(frontMatter.title, { lower: true }))
        const fileRelativePath = `content/blog/${fileName}.json`
        return await github
          .commit(
            fileRelativePath,
            getCachedFormData(fileRelativePath).sha,
            JSON.stringify({
              ...frontMatter
            }),
            'Add new blog page'
          )
          .then((response) => {
            setCachedFormData(fileRelativePath, {
              sha: response.content.sha
            })
            setTimeout(() => router.push(`blog/${fileName}`), 1500)
          })
          .catch((e) => {
            return { [FORM_ERROR]: e }
          })
      }
    }
  ])
}
