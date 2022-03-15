export function fileToUrl (filepath: string, base: string = null) {
  return filepath.replace('.json', '').replace(base, '').replace('/', '')
}
