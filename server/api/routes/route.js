const authRoute = require('./auth_route');
const imageRoute = require('./image_route');

const routes = [
  {
    path: '/api/image',
    handler: imageRoute
  },
  {
    path: '/api/auth',
    handler: authRoute
  },
  { 
    path: '/',
    handler: (req, res) => {
      return res.send('Server is running...')
    }
   }
]

module.exports = executeAbleRoute = (app) => {
  routes.forEach((route) => {
    if(route.path === '/') {
      app.get(route.path, route.handler)
    }else {
      app.use(route.path, route.handler)
    }
  })
}