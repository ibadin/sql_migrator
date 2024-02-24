import { readdir } from 'node:fs/promises'

const findByExtension = async (dir, ext) => {
  const matchedFiles = []

  const files = await readdir(dir)

  for (const file of files) {
    // Method 2:
    if (file.endsWith(`.${ext}`)) {
      matchedFiles.push(file)
    }
  }

  return matchedFiles
}

export {
  findByExtension,
}