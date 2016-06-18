# qordova-file

A [Q](https://github.com/kriskowal/q)-enabled filesystem wrapper for Cordova. Easier to use than [cordova-plugin-file](https://github.com/apache/cordova-plugin-file).

# Installation

`cordova plugin add cordova-plugin-file`

`npm install quordova-file`

# Usage

## exists(fname)

Check to see if a file exists.

```
// Note that we must wrap inside `deviceready` because it uses Cordova features.
document.addEventListener("deviceready", (function() {
  File.exists(fname)
  .then(function() {
    console.log('exists');
  })
  .fail(function() {
    console.log('does not exist');
  });
}), false);
```

## rm(file\_or\_dir)

Remove a file or recursively remove a directory.

```
// Note that we must wrap inside `deviceready` because it uses Cordova features.
document.addEventListener("deviceready", (function() {
  File.rm(fname)
  .then(function() {
    console.log('file or directory deleted, or didn't exist in the first place');
  })
  .fail(function(FileError) {
    console.log('could not delete file or directory', err);
  });
}), false);
```