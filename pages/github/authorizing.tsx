import { useGithubAuthRedirect } from 'react-tinacms-github'
import { Box, Text, Button } from '@chakra-ui/react'

// Our GitHub app redirects back to this page with auth code
export default function Authorizing () {
  // Let the main app know, that we received an auth code from the GitHub redirect
  useGithubAuthRedirect()

  return (
    <Box w='lg' m={'auto'} p='10'>
      <Text fontSize={'xl'} align={'center'}>Authorising your account with Github, please wait...</Text>
      <Button isLoading isFullWidth p={'10'} bg={'transparent'}/>
    </Box>
  )
}
