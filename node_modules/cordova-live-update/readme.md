# cordova-live-update

`cordova-live-update` provides secure over-the-air web stack updates for Cordova applications. Many updates to hybrid applications involve
only web stack (JavaScript/HTML/CSS/fonts) changes and no native code changes at all. With this package, you can provide your users convenient
updates.

It works like this:

1. Include this library in your Cordova/Ionic application
2. Perform a periodic check by calling `LiveUpdater.go()`
3. `LiveUpdater` will download, install, and then run updated code bundles

What's included in the bundles? For now, everything. I am looking at ways of providing secure deltas for reduced bandwidth, but for now the
entire zip bundle of web stack logic is transmitted in the update.

A major security concern for live updates is the [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) whereby some attacker
pretends to serve an updated zip that is infact malaicious code. Until I implement code signing, I recommend using this package only during
development and on trusted networks.

# Installation

`npm install cordova-live-update`

# Basic Usage

```
// Note that we must wrap inside `deviceready` because it uses Cordova features.
document.addEventListener("deviceready", (function() {
  updater = new LiveUpdate({...options, see below...});
  updater.go(); // Check for updates, install, and then launch
}), false);
```

# Configuration

Supply these options to the LiveUpdate constructor.

The following options are required.

Name | Discussion
---- | ----------
updateUrl | **Required**. The URL where your update zips are located.
originalBuildId | **Required**. The build ID of the bundled/packaged version that the app shipped with.

The following options are sent to sensible defaults but can be overridden if custom behavior is needed.

Name | Discussion
---- | ----------
appEntryPoint | The entry point to use when running your updated app. Defaults to `app.html`
recheckTimeoutMs | When LiveUpdate is set to check for udpates repeatedly, it will use this timeout between rechecks. Default 5 seconds. Note that this delay will happen between the end of one checkout and the beginning of the next.
afterUpdateAvailable | Called when an update is available. Override by returning a promise that resolves if LiveUpdate should proceed with downloading and rejects if LiveUpdate should not proceed with downloading.
afterDownloadComplete  | Called when download and unzip is complete. Override by returning a promise that resolves if LiveUpdate should proceed with installation and rejects if LiveUpdate should not proceed with installation.
afterInstallComplete | Called after installation has finished. At this point, an application reboot will load the new version. Override by returning a promise that resolves if LiveUpdate should proceed to the reboot step or rejects if LiveUpdate should proceed to the reboot step.
beforeReboot | Called before LiveUpdate reboots the application. Override with a promise that resolves if LiveUpdater should reboot and rejects if LiveUpdater should not reboot.
getCurrentBuildId | Function callback taking the form `function()`. Defaults to getting and setting build number from local storage, override if you would like to do something else.
setCurrentBuildId | Function callback taking the form `function(build_id)`. Defaults to local storage, override if you would like to do something else.
localStorageVar | The variable name used to hold the current version number. Defaults to `buildno`. If you don't want to change the functions above, you can use this to alter just the variable name used.
bundleRoot | The local file path to where bundles should be downloaded and unzipped. This must be a permanent storage location. Defaults to `cordova.file.dataDirectory`.

Overriding `afterDownloadComplete` can be useful if you wish to override the default `confirm()` behavior. Here is an Ionic confirmation example:

```
afterDownloadComplete: function(currentId, latestId) {
  var confirmPopup, d;
  d = $q.defer();
  confirmPopup = $ionicPopup.confirm({
    title: 'Update Available',
    template: sprintf("Version %d is available for download (you are running %d). Update now?", latestId, currentId),
    buttons: [
      {
        text: 'Update Later',
        onTap: (function() {
          return d.reject();
        })
      }, {
        text: 'Update Now',
        type: 'button-positive',
        onTap: (function() {
          return d.resolve();
        })
      }
    ]
  });
  return d.promise;
}
```

## go()

Check for updates, install, and then launch.

## checkOnce

Check for an update. If the update is 

```
updater.checkOnce()
.then(function(current\_build\_id) {
  console.log("The current build ID is", current\_build\_id);
});
```

## checkRepeatedly

Check for updates repeatedly. Useful for debugging mode. 

```
updater.checkRepeatedly();
```

# Creating, Testing, and Hosting Bundles

When you install the `cordova-live-update` package, it installs a few utilities in `node_modules/.bin` to help you create and test bundles.

By default, `cordova-live-update` will create bundles from what exists in `platforms/ios/www` and assign build IDs based on timestamps. If you want to do something different, you can customize that behavior below.

## Creating a Bundle

To create a bundle, simply run this from the root of your Cordova/Ionic project:

`./node_modules/.bin/liveupdate-bundle`

You can optionally supply a build number as the first parameter:

`./node_modules/.bin/liveupdate-bundle 123`

By default, this will zip of everything in `platforms/ios/www` and place it in `./liveupdate/`. It will create a `liveupdate.json` there too, which references the latest bundle available.

To cange this behavior, create a `.env` in your project root and use these variables:

```
BUNDLE_TARGET=`pwd`/liveupdate        # The path to where you would like your bundles to be stored locally for testing
BUNDLE_SRC=`pwd`/platforms/ios/www    # The path to the web stack files to bundle into your zip
```

## Testing a Bundle

`cordova-live-update` comes with a mini [express](https://www.npmjs.com/package/express) server to serve your bundles.

To start your local server, run the following command:

`./node_modules/.bin/liveupdate-serve`

By default, this will listen on `127.0.0.1:4000` and will use a web root of `./liveupdate`. Use `BUNDLE_TARGET` and `BUNDLE_PORT` environment variables if you wish to change either of those settings.

Lastly, you need to configure `LiveUpdater` to use your local testing environment. `LiveUpdater` expects you to provide a URL where updates live. It works like this:

1. Fetch `liveupdate.json` from config URL. `liveupdate.json` contains a single integer build number.
2. Compare build number in `liveupdate.json` with local build number. The initial local build number is supplied in the `LiveUpdate` config but `LiveUpdate` tracks the latest current build number after that. (If you want to override how `LiveUpdate` stores build numbers, look at the config section above).
3. If the remote build is greater than the local build, `LiveUpdate` downloads `<buildnumber>.zip` from the remote source, unzips it, installs it, and then reboots the application. Youc an override the details of how `LiveUpdate` handles each of these steps. See the config above.
  
## Hosting Bundles

Hosting bundles for production use is not recommended until code signing. That said, `LiveUpdater` will happily check and download bundles from any URL you specify.
