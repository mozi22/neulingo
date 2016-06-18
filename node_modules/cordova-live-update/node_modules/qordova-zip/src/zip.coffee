Q = require('q')

class ZipError
  constructor: (@zipFname, @unzipDir, @errorInfo)->

class Zip
  @unzip: (zip_fname, unzip_dir) ->
    deferred = Q.defer()
    console.log("Unzipping to ", zip_fname, unzip_dir)
    zip.unzip(zip_fname, unzip_dir, ((err)->
      if(err)
        console.log("Error unzipping to ", unzip_dir, err)
        deferred.reject(new ZipError(zip_fname, unzip_dir, err))
      else
        console.log("Successfully unzipped to ", unzip_dir)
        deferred.resolve()
    ), ((progress)->
      console.log("Unzip progress", progress)
      deferred.notify(progress)
    ))
    deferred.promise
    
module.exports =
 Zip: Zip
 ZipError: ZipError