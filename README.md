
# Peer-Portal
<p align="center">
<img src="https://github.com/MarkXtenda/peer-portal/blob/main/vid.gif?raw=true" />
</p>
This is a chat application built using Ruby on Rails with the help of ActionCable, ActiveStorage, React, and Redux. 

## Description
The application allows users to sign in or log in and engage in real-time messaging with other users. Users have the ability to create public or private channels and become admins of these groups. While admins have additional privileges such as deleting or updating their channels and removing other users from the channels, other users able join or leave the chat rooms.

## Features
* User Authentication: Users can sign in or log in to the application to access the chat features.
* Real-time Messaging: Users can send and receive messages in real time, allowing for interactive and dynamic conversations.
* Public and Private Channels/Groups: Users can create public channels/groups that are accessible to all users, or private channels/groups that require an invitate code to join.
* Admin Privileges: Users who create a channel/group become the admin and have the ability to manage the channel/group, including deleting or updating it, as well as removing other users.
* Avatar Customization: Users or Channels can change their avatars, which will be displayed to everyone in the chatroom, adding a personal touch to their profile.
* Image Support: Users can not only send text messages but also attach images to it, enhancing the chat experience.
## Technologies Used
Ruby on Rails: The web application framework used to build the backend of the chat application.
React: A JavaScript library for building user interfaces, used for the frontend of the chat application.
Redux: A state management library for JavaScript applications, used in conjunction with React to manage the application's state effectively.

## Installation
1. Clone the repository.

   `git clone https://github.com/your-username/chat-application.git`
2. Install the dependencies:

   `bundle install`
3. Set up the database:
   `rails db:migrate db:seed`
3. Head to the frontend folder.
   
   `cd frontend`
4. Start the React and Rails server:

   `npm start`
## Contributing
If you would like to contribute to the development of this application, feel free to fork the repository and create a pull request.

## Creators
This project was created by Mark Kholodii.
