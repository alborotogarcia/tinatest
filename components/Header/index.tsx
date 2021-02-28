import { useEffect, useState } from 'react'
import { Flex, Box, useMediaQuery, Menu, MenuList, MenuItem, MenuButton, Link as UILink } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImageComponent } from '../Image'

interface Props {
  data?: {
    header: {
      navigation: {
        name: string
        link: string
      }[]
    }
  }
}

export const Header = ({ data }: Props) => {
  const router = useRouter()
  const [isLargeScreen] = useMediaQuery('(min-width: 900px)')
  const [Nav, setNav] = useState(null)
  useEffect(() => {
    const navigation = data?.header?.navigation || []
    if (isLargeScreen) {
      setNav(navigation.map(({ name, link }, index) => (
        <Link href={link} key={index} passHref><UILink p='4' _hover={{ textDecoration: 'underline' }}>{name}</UILink></Link>
      )))
    } else {
      setNav(<Menu>
        <MenuButton>Menu</MenuButton>
        <MenuList>
          {navigation.map(({ name, link }, index) => (
            <MenuItem key={index} className={router.pathname ? 'active' : ''}><Link href={link}><a className={router.pathname ? 'active' : ''}>{name}</a></Link></MenuItem>
          ))}
        </MenuList>
      </Menu>)
    }
  }, [isLargeScreen, data])

  return (
        <Box bg='white' boxShadow="base">
            <Flex maxW='xl' m='auto' p='3' justify='space-between' align={'center'}>
              <Link href='/'>
                <>
                  <ImageComponent src='/logo.png' width='200px' alt='logo'/>
                </>
              </Link>
              <Flex>
                {Nav}
              </Flex>
            </Flex>
        </Box>
  )
}
