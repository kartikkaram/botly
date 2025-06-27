import fs from 'fs'


export const deleteFromTemp=async (filePath) => {
 try {
    await fs.promises.unlink(filePath)
 } catch (error) {
    console.log("error while deleting the csv file",error)
 }
}
