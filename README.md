# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## VS Code Settings

Set vscode extensions (just copy/paste all rows below in search bar):

```
dbaeumer.vscode-eslint
esbenp.prettier-vscode
rangav.vscode-thunder-client
richie5um2.vscode-sort-json
rohit-gohri.format-code-action
streetsidesoftware.code-spell-checker
yzhang.markdown-all-in-one
mhutchie.git-graph
```

Set vscode settings::

```
{
  // Runs Prettier, then ESLint
  "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": false,
  "editor.tabSize": 2,
  "window.zoomLevel": 2,
  "workbench.colorTheme": "Default Dark+"
}
```

#TODO:

- create Home page with statistic and analytic
- format last time to 5 mins ago, 1 day ago
- add mechanism of repeating
- create a progress line for all words with Levels (A1, B1 etc) as thresholds
- create slipping mechanism so app notify user that they've spent serctain amount of time
- add reseting of progress
- catigorize decks so user can select only to learn
- show progress by category
- make indicator of pressed button (For what ?)
- add speaking both sides
- add auto speaking
- add auto page changing
- add ability to add a new cards by user
- create converter from card to DB schema and back
