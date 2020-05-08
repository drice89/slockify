# README



## [Slockify](https://slockify.herokuapp.com/#/)

Slockify is a clone of slack with styling and branding inspiraction from spotify. It's core features are live chat and the ability to support direct messages, group messages, and channels. This "flavor" of slack has one very special feature - each channel comes with its own playlist allowing users to collaborate and listen together. Users can add songs directly to the playlist by typing '/add_song {songId}' into their chat box.

Authentication is handled by a combination of rails and react without and additional libraries and at the current time there are no plans to include google/facebook SSO. 

The app runs on a pub/sub pattern where the users will subscribe to conversations and have live changes pushed to them directly by the server through websockets. The workflow is illustrated below.


Currently, all user data (including messages for all subscribed channels) is pushed to the user on login. The user is subsequently subscribed to all channels when they initialize the client. This negates the need for additional AJAX requests because all changes are pushed through the subscribed channels. This presents a problem with scalability, especially where the messages are concerned so there is a planned refactor to pull messages on demand (when the user clicks on a conversation) vs on login. 


## Technology used by this project:
* Ruby v2.5.1p57
* Rails vRails 5.2.4.2
* babel
* babel-loader
* react
* redux
* react-dom
* react-redux
* react-router-dom
* redux-logger
* redux-thunk
* webpack
* webpack-cli

* jquery
* Postgresql
* redis - for production through heroku
* This project also uses the spotify api


## Deployment Instructions

Make sure you have postgresql installed and running and then clone the repository.

In the root directory, run
`npm install`
`bundle install`

To create and seed the database run
`rails db:create`

If you want to reset the database, run
`rails db:reset`

Run
`rails s`

In a new terminal window, run
`npm start`

Navigate to localhost:3000 in your browswer


# slockify

Public Domain images used
https://www.pexels.com/photo/man-in-black-crew-neck-shirt-wearing-black-framed-eyeglasses-4212883/
https://www.pexels.com/photo/shallow-focus-photo-of-woman-wearing-black-beanie-3804725/
https://www.pexels.com/photo/woman-in-black-fur-coat-wearing-white-headphones-3786670/
https://www.pexels.com/photo/man-wearing-denim-jacket-singing-on-stage-894156/