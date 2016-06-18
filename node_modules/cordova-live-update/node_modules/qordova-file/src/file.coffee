Q = require('q')

class FileError
  constructor: (@fname,@errorInfo)->

class FileDeleteError extends FileError

class DirectoryDeleteError extends FileError
    
class File
  @exists: (fname)->
    console.log("Checking to see if exists:", fname)
    d = Q.defer()
    window.resolveLocalFileSystemURL(fname, ((fileEntry)->
      d.resolve(fileEntry)
    ), ((fileError)->
      d.reject(fileError)
    ))
    d.promise

  @rm: (fname) ->
    deferred = Q.defer()
    File.exists(fname)
    .then((fileEntry)->
      if fileEntry.isFile
        console.log("Is a file", fname)
        fileEntry.remove( ((success)->
          console.log("Delete successful", success)
          deferred.resolve()
        ), ((err)->
          console.log("Delete unsuccessful", err)
          deferred.reject(new FileDeleteError(fname,err))
        ))
      if fileEntry.isDirectory
        console.log("Is a directory", fname)
        fileEntry.removeRecursively( ((success)->
          console.log("Dir was successfully removed", fname)
          deferred.resolve()
        ), ((err)->
          console.log("There was an error removing the directory", err)
          deferred.reject(new DirectoryDeleteError(fname,err))
        ))
    )
    .fail(->
      console.log("File does not exist", fname)
      deferred.resolve();
    )
    deferred.promise
    
module.exports =
  File: File
  FileError: FileError
  FileDeleteError: FileDeleteError
  DirectoryDeleteError: DirectoryDeleteError