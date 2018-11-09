import React from 'react'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter';

import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import App from './app'

// var redis = require("redis").createClient();
// // if you'd like to select database 3, instead of 0 (default), call
// // client.select(3, function() { /* ... */ });
// redis.on("error", function (err) {
//     console.log("[Redis]Error " + err);
// });

module.exports = function render(req, initialState) {
  // Configure the store with the initial state provided
  const store = configureStore(initialState)

  // redis.get(req.url, function(err, reply) {
  //   console.log(err);
  //   console.log(reply);
  // });

  // render the App store static markup ins content variable
  let content = renderToString(
    <Provider store={store} >
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // Get a copy of store data to create the same store on client side 
  const preloadedState = store.getState()

  return { content, preloadedState };
}
