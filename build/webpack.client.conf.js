const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = {
  plugins: [
    new VueSSRClientPlugin()
  ]
}
