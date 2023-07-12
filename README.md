## [Slockify](https://slockify.herokuapp.com/#/)

![Screen Capture](https://media2.giphy.com/media/Ke2HDUYBNi5LA7KyE9/giphy.gif)

Slockify is a clone of slack with styling and branding inspiraction from spotify. It's core features are live chat and the ability to support direct messages, group messages, and channels. This "flavor" of slack has one very special feature - each channel comes with its own playlist allowing users to collaborate and listen together. Users can add songs directly to the playlist by typing `/add_song {songId}` into their chat box.

Authentication is handled by a combination of rails and react without and additional libraries and at the current time there are no plans to include google/facebook SSO. 

The app runs on a pub/sub pattern where the users will subscribe to conversations and have live changes pushed to them directly by the server through websockets. The workflow is illustrated below.

![Slockify dataflow](https://i.imgur.com/eKRUWpr.png)

This interaction is illustrated by the workflow that drives the message creation process.

What happens when you type a message here and then hit the "enter" button?

![message form](https://i.imgur.com/B2D95uf.png)

The message is sent via the handleSubmit function in message_form.jsx. It checks to make sure the message is valid and then access the "App" object that is passed down from rails.

The App object has multiple subscriptions at this point. The user is subscribed to both the master channel that controls all of the user's channel subscriptions, and the chat channel which controls the messages for the conversation. We index into the second subscription, which represents the current conversation, and call the channel's speak function, passing in the the message object (which includes the user and conversation ids), and the playlistUrl in case the message is intended to modify the playlist.

```message_form.jsx

handleSubmit(e) {
  e.preventDefault();
    
  if (!this.invalidRequest()) {
    App.cable.subscriptions.subscriptions[1].speak({ message: this.state, playlistUrl: this.props.playlistUrl });
    this.setState({ body: "" });
  }
}
```

When our conversation mounted, we set up the conversation subscription. The first parameter tells the server the name of the subscription, the second parameter sets up the actions.

```conversations_container.jsx
App.cable.subscriptions.create(
  { 
    channel: `ChatChannel`, 
    room: this.props.conversation.id 
  },{
    // Dispatch an action when data is recieved back from the socket 
    received: data => {
      switch(data.action) {
        case "new":
          return this.props.editMessage(data.message);
        case "update": 
          return this.props.editMessage(data.message);
        case "remove":
          return this.props.deleteMessage(data.message);
        case "error":
          return console.log(data.error);
      }
    },
   // The below actions are defined serverside and handle incoming data
    speak: function (data) {
      return this.perform("speak", data);
    },
    update: function(data) {
      return this.perform("update", data);
    },
    remove: function (data) {
      return this.perform("remove", data);
    }
   });
```

So by indexing into the correct subscription and calling the speak function, we can send data to the server via the cable.

On the server side, the chat channel's speak function handles the incoming message. It recieves the action, saves the message to the database, and sends it back out to everyone who is subscribed to the channel.

```chat_channel.rb
def speak(data)
      # first we must transform the keys to ensure the correct casing in ruby
      data.deep_transform_keys! { |key| key.underscore }
      
      # check to see if the user is just sending a message or trying to add a song to a playlist
      unless data["message"]["body"].starts_with?("/add_song")
        # Create the message and store it to the database
        message = Message.create(data["message"])
        # transform
        socket = { message: message.attributes.deep_transform_keys! { |key| key.camelize(:lower) }, action: "new" }
        ChatChannel.broadcast_to(find_convo(message.recipient_id), socket)
      ...
  end
```

The message is recieved by all users who are currently subscribed to that conversation. 

```
      received: data => {
        switch(data.action) {
          case "new":
            return this.props.editMessage(data.message)
```
The editMessage function is called which dispatches the recieveMessage action to our store:

```messages_reducer.jsx

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state );
  
  switch(action.type) {
  ...
    case RECEIVE_MESSAGE:
      nextState[action.message.id] = action.message;
      return nextState;
  ...
```

The message body, along with the id of the sender and the conversation, get stored in global state. The edit and delete message functions work the same way. Adding new conversations also work this way. Once the user is logged in, most of the updates are handled by action cables. We do hit the /api/conversations/:conversation_id/messages enpoint when we change the conversation or the channel, but the rest of the updates to the application are handled by action cables.



## Features

 - Real time chat
 - Direct messages and group chat with other users
 - Shared user channels
 - Single sign on through Spotify
 - Create and build collaborative playlists with user created channels

## Technology used by this project:

- ReactJs
- Redux
- Ruby on Rails
- PostgreSQL
- Rails action cables
- Spotify Api
- Ruby
- Babel
- Webpack
- Redux Thunk
- React Router Dom
- JQuery
- Heroku
- Redis
- Font Awesome
- Rspotify
- Omniauth

## Deployment Instructions
Ensure you have Ruby installed along with the 'rails' and 'bundler' gems

Make sure you have postgresql installed and running and then clone the repository.
`brew install libpq`
`brew install postgresql`
`brew services start postgresql`

In the root directory, run
`npm install`
`bundle install`

To create and seed the database run
`rails db:create`

Create MasterUser prior to seeding. Login with spotify. You want the user with user_id 1 to be your master user. This is the user the system will use to create all playlists. Look at MasterChannel::create_playlist for more information.

If you want to reset the database, run
`rails db:reset`

Run
`rails s`

In a new terminal window, run
`npm start`

Navigate to localhost:3000 in your browser

You can also create a docker image for the back end by navigating to the root directory in your terminal and typing
`docker build -t slockify .`


# slockify

Public Domain images used
https://www.pexels.com/photo/man-in-black-crew-neck-shirt-wearing-black-framed-eyeglasses-4212883/
https://www.pexels.com/photo/shallow-focus-photo-of-woman-wearing-black-beanie-3804725/
https://www.pexels.com/photo/woman-in-black-fur-coat-wearing-white-headphones-3786670/
https://www.pexels.com/photo/man-wearing-denim-jacket-singing-on-stage-894156/
