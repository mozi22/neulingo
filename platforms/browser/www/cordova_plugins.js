cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.plugin.datepicker/www/datepicker.js",
        "id": "org.apache.cordova.plugin.datepicker.Datepicker",
        "pluginId": "org.apache.cordova.plugin.datepicker",
        "clobbers": [
            "window.plugins.datePicker"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-device": "1.1.2",
    "cordova-plugin-datepicker": "0.9.3",
    "org.apache.cordova.plugin.datepicker": "1.0.0",
    "cordova-plugin-browsersync": "0.1.1"
}
// BOTTOM OF METADATA
});