# Sound Scape App

This is a simple streaming music application built using React Native. The app provides top tracks for a selected country (Mexico).

## Features

- Get top 30 tracks by country
- Store last 10 tracks played

## Tech Stack

- [React Native](https://reactnative.dev/)
- [LastFM Music API](https://www.last.fm/api/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)

## Installation

#### Step 1:

- Clone the repo
- Open it in your favorite editor
- Open a terminal and run

```bash
  yarn install
```

#### Step 2:

- Head over to https://www.last.fm/api to get an API key. (You will have to sign up)
- Create a `.env` file in the root folder and put your keys in the file like this:

```
API_KEY=YourWeatherApiKeyHere
TOP_TRACKS_LIMIT=30
```

## Deployment

To deploy this project run for iOS:

```bash
  yarn ios
```

for Android:

```bash
yarn android
```

## Dependencies

```json
"dependencies": {
    "@miblanchard/react-native-slider": "^2.3.1",
    "@react-native-async-storage/async-storage": "^1.19.3",
    "@react-navigation/native": "^6.1.8",
    "@react-navigation/native-stack": "^6.9.14",
    "axios": "^1.5.1",
    "react": "18.2.0",
    "react-native": "0.72.5",
    "react-native-safe-area-context": "^4.7.2",
    "react-native-screens": "^3.25.0",
    "react-native-vector-icons": "^10.0.0"
  },
```

## App Screenshots

![App Screenshot](https://user-images.githubusercontent.com/54822197/273694644-68c1da15-4f54-4bf8-a4a0-99ea7a8149c8.png)

![App Screenshot](https://user-images.githubusercontent.com/54822197/273694651-79d61c7c-0826-4e55-a46f-8be8a7cb3013.png)

![App Screenshot](https://user-images.githubusercontent.com/54822197/273694656-32d89962-a172-4e96-bde7-359f84bcce7d.png)

![App Screenshot](https://user-images.githubusercontent.com/54822197/273694658-4f89cf3b-d6b8-4e40-884f-4f06e97f93c2.png)
