import fs from 'fs'

export const deleteFromTemp=async (filePath) => {
 try {
      fs.unlinkSync(filePath)
 } catch (error) {
    console.log("error while deleting the file", error.message)
 }
}
