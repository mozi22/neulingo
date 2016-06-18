Q = require('q')
File = require('qordova-file').File
Http = require('qordova-http').Http
Zip = require('qordova-zip').Zip
msprintf = require('sprintf-js')
sprintf = msprintf.sprintf
extend = require('extend')
xhr = require('xhr')


class LiveUpdate
  constructor: (options) ->
    @options = {
      updateUrl: null
      originalBuildId: null
      appEntryPoint: 'app.html'
      localStorageVar: 'buildno'
      recheckTimeoutMs: 5000
      afterUpdateAvailable: (current_id, latest_id)=>
        d = Q.defer()
        d.resolve()
        d.promise
      afterDownloadComplete: (current_id, latest_id)=>
        d = Q.defer()
        res = confirm(sprintf("Version %d is available for download (you are running %d). Update now?", latest_id, current_id))
        if res?
          d.resolve()
        else
          d.reject()
        d.promise
      afterInstallComplete: (current_id, latest_id)=>
        d = Q.defer()
        d.resolve()
        d.promise
      beforeReboot: (id_to_load)=>
        d = Q.defer()
        d.resolve()
        d.promise
      getCurrentBuildId: =>
        Math.max(parseInt(localStorage.getItem(@options.localStorageVar)), @options.originalBuildId)
      setCurrentBuildId: (build_id)=>
        localStorage.setItem(@options.localStorageVar, build_id)
      bundleRoot: cordova.file.dataDirectory
    }
    extend(@options, options)
    if(!@options.updateUrl || !@options.originalBuildId)
      alert('LiveUpdater *requres* update URL and original build ID')
      throw new Exception('LiveUpdater *requres* update URL and original build ID')
    
  checkRepeatedly: (timeoutMs)=>
    @keepChecking = true
    again = =>
      @checkOnce()
      .then(=>
      )
      .fail((err)=>
        console.log("Check failed", err)
      )
      .finally(=>
        if(@keepChecking)
          setTimeout(again, timeoutMs or @options.recheckTimeoutMs)
      )
    again()
  
  stopCheckingRepeatedly: =>
    @keepChecking = false
    
  checkOnce: =>
    d = Q.defer()
    current_build_id = @options.getCurrentBuildId()
    console.log("Current build version is ", current_build_id)
    @fetchLatestBuildInfo()
    .then((latest_build_id)=>
      if latest_build_id <= current_build_id
        console.log("We have the latest build, no action needed")
        return
      console.log("Update is requested")
      @options.afterUpdateAvailable(current_build_id, latest_build_id)
      .then(=>
        @download(latest_build_id)
      )
      .then(=>
        @options.afterDownloadComplete(current_build_id, latest_build_id)
      )
      .then(=>
        @install(latest_build_id)
      )
      .then(=>
        @options.afterInstallComplete(current_build_id, latest_build_id)
      )
      .then(=>
        @loadApp(latest_build_id)
      )
    )
    .fail((err)=>
      console.log("Check failed or was aborted", err)
      d.reject(err)
    )
    .finally(=>
      console.log("Done trying to download and install.")
      d.resolve()
    )
    d.promise
    
  go: =>
    @checkOnce()
    .then((build_id)=>
      console.log("Loading app", arguments)
      @loadApp(build_id)
    )
    .fail((err)=>
      console.log("Check failed, loading current local build of app.", err)
      @loadApp(@options.getCurrentBuildId())
    )
    
  fetchLatestBuildInfo: =>
    deferred = Q.defer()
    console.log("Fetching latest build version info")
    xhr(sprintf('%s/liveupdate.json?r=%d', @options.updateUrl, (new Date()).getTime()), ((err, response, body)->
      if(response.statusCode == 200)
        latest_build_id = JSON.parse(response.body)
        console.log("Latest build on server is ", latest_build_id)
        deferred.resolve(latest_build_id)
      else
        console.log("Error fetching version info", err,response)
        deferred.reject(err)
    ))
    deferred.promise
    
  loadApp: (build_id)=>
    return unless @options.beforeReboot(build_id)
    app_html = @options.appEntryPoint
    if(build_id)
      new_app_html = sprintf("%s%s/%s", @options.bundleRoot, build_id, @options.appEntryPoint)
      File.exists(app_html)
      .then(->
        console.log("New app exists", new_app_html)
        app_html = new_app_html
      )
      .fail(->
        console.log("New app is missing, using default")
      )
      .finally(->
        console.log("Navigating to ", app_html)
        window.location = app_html
      )
    else
      console.log("Navigating to ", app_html)
      window.location = app_html
    
  download: (build_id)=>
    deferred = Q.defer()
    zip_fname = sprintf("%s%s.zip", @options.bundleRoot, build_id)
    unzip_dir = sprintf("%s%s", @options.bundleRoot, build_id)
    url = sprintf("%s/%d.zip", @options.updateUrl, build_id)
    Q.all([File.rm(zip_fname),File.rm(unzip_dir)])
      .then(=>
        Http.download(url, zip_fname)
      )
      .then(=>
        Zip.unzip(zip_fname, unzip_dir)
      )
      .then(=>
        console.log("New build version is ", build_id)
        @options.setCurrentBuildId(build_id)
        deferred.resolve()
      )
      .fail((err)=>
        console.log("Install failed", arguments)
        deferred.reject(err)
      )
    deferred.promise

  install: (build_id)=>
    d = Q.defer()
    console.log("New build version is ", build_id)
    @options.setCurrentBuildId(build_id)
    d.resolve()
    d.promise
    
module.exports = LiveUpdate
