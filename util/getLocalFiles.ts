
export const getLocalFiles = async (filePath) => {
  // grab all json files
  const fg = require('fast-glob')
  return await fg(`${filePath}**/*.json`)
}
