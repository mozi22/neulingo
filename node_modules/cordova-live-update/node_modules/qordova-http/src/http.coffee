Q = require('q')

class HttpError
  constructor: (@url, @dstFname, @errorInfo)->

class Http
  @download: (url, dst_fname)->
    deferred = Q.defer()
    ft = new FileTransfer()
    console.log("About to start transfer", url);
    ft.download(url, dst_fname, ((entry)->
      console.log("File downloaded successfully")
      deferred.resolve()
    ), ((err)->
      console.log("Could not download file", err)
      deferred.reject(new HttpError(url, dst_fname, err))
    ))
    deferred.promise
    
module.exports =
  Http: Http
  HttpError: HttpError