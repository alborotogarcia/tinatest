// import Image from 'next/image' // Needs both height and width to be set, waiting for update
import { Image } from '@chakra-ui/react'

interface Props {
  src: string;
  height?: string;
  width?: string;
  alt?: string;
}
export const ImageComponent = ({ src, height = 'auto', width = 'auto', alt = '' }: Props) => {
  return (
    <Image height={height} width={width} src={src} alt={alt} />
  )
}
