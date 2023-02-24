const React = require('react')
const ReactDOM = require('react-dom/client')
const App = require('./App')
const x = require('bootstrap/dist/css/bootstrap.min.css')
const y = require('../public/index.css')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
