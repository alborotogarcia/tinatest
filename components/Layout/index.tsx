import { useFormScreenPlugin } from 'tinacms'
import { Header } from '../Header'
import { Box, Text } from '@chakra-ui/layout'
import { useGithubJsonForm } from 'react-tinacms-github'
import { ReactNode } from 'react'
import { Container } from './styles'
import { headerForm } from './headerForm'

interface Props {
  children: ReactNode,
  global?: any
}
const dummyGlobal = {
  props: {
    file: {}
  }
}

export const Layout = ({ children, global = dummyGlobal }: Props) => {
  const [data, hForm] = useGithubJsonForm(global.props.file, headerForm)
  useFormScreenPlugin(hForm)
  return (
    <>
      <Header data={data}/>
        <Container>
          {children}
        </Container>
      <footer>
        <Box maxW='xl' justifyContent='center' m='auto' p='3'>
          <Text fontSize="xs" >Copyright footer text</Text>
        </Box>
      </footer>
    </>
  )
}
