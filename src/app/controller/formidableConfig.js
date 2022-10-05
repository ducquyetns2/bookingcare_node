import formidable from 'formidable'

function formidableConfig(dir) {
    const options = {
        uploadDir: dir,
        keepExtensions: true,
        filename: (name, ext) => {
            return name + '-' + Date.now() + ext
        }
    }
    return formidable(options)
}
export default formidableConfig