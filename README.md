# Task Manager

## Environment

```
# front
node v24.2.0
npm 11.3.0

# server
mongodb 8.0.10

# android
openjdk 21.0.4 2024-07-16 LTS
OpenJDK Runtime Environment Temurin-21.0.4+7 (build 21.0.4+7-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.4+7 (build 21.0.4+7-LTS, mixed mode)
Android Studio 2024.2.2

# ios
ruby 2.6.10p210
XCode 16.1

# others
WebStorm IDE 2024.1.2
```

## Installation

- Clone the Project
- Run these commands in the `client` folder: `npm install` `cd ios && bundle exec pod install`
- Duplicate the `.env.example` file and rename it into `.env`
- Fill the `API_URL` field in it (`localhost:3031`, for example)
- Run the `npm run start` command in the `client` folder
- Be sure, that MongoDB is running on your PC
- Run the `node server.js` command in the `server` folder in another terminal

### Screenshots

![All Tasks](/readme/all_tasks.png?raw=true)
![Important Tasks](/readme/important_tasks.png?raw=true)
![Uncompleted Tasks](/readme/uncompleted_tasks.png?raw=true)
![Edit Task](/readme/edit_task.png?raw=true)

### todo

- Splash Screen
- App Logo
- Animations
- Blackout for the bottom sheets
