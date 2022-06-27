module.exports = {
  filenameHashing: false,
  pwa: {
    //name: 'My App',
    name: 'iEdge Promo',
    themeColor: "#333333",
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    assetsVersion: "1.0.0",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
      importWorkboxFrom: "disabled"
    },
    manifestOptions: {
      //short_name: "vue-todo",
      short_name: "iEdge Promo",
    },
  },
};
