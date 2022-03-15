import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'

export const getGlobalStaticProps = async (preview, previewData) => {
  const fileRelativePath = 'content/global.json'

  if (preview) {
    try {
      const previewProps = await getGithubPreviewProps({
        ...previewData,
        fileRelativePath,
        parse: parseJson
      })
      return {
        props: {
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          ...previewProps.props
        }
      }
    } catch (e) {
      return {
        props: {
          previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
          file: {
            fileRelativePath,
            data: null
          }
        }
      }
    }
  }


  const data = (await import('../content/global.json')).default

  return {
    props: {
      file: {
        data,
        fileRelativePath
      }
    }
  }
}
