const FILETYPE = /image\/(jpg|jpeg|gif|png|bmp)$/
const MAXFILESIZE = 5000000 // 5MB

/**
 * validate
 * Take a file, validate and return a Promise
 * Pass a `status` object back with Promise
 * @param  {File Object} file
 * @return {Promise}
 */

function validate (file) {
  if (!file) return

  let status = {
    result: true
  }

  return new Promise((resolve, reject) => {
    // validate file type (render error)
    if (!file.type.match(FILETYPE)) {
      status.result = false
      status.title = 'hmm...'
      status.message = 'The file you tried to upload is a type we don’t understand. Supported image formats are JPEG, PNG, and GIF.'
      reject(status)
    }

    // validate file size (render error)
    if (file.size > MAXFILESIZE) {
      status.result = false
      status.title = 'hmm...'
      status.message = 'The file you tried to upload exceed our limit (5MB). Try uploading a smaller version.'
      reject(status)
    }

    resolve(status)
  })
}

export {
  validate
}
