## Todo list

### MVP

- ~~Finish front-end game initialization in `services/game/index.js`~~
    - ~~Clarify game init vs round init~~
- ~~Create and connect to start game button (available only to host)~~
- Round logic
    - ~~Turn order~~
    - Consider disconnect/reconnection
- Should be able to view at any time:
    - ~~Hand, to see what they need~~
    - Table, to see what's been played
    - ~~Phase, so they know what they're aiming for (maybe show when viewing hand?)~~
    - Phase list
    - Turn order (and what phase they are on)
    - Top of discard pile
- Turn logic
    - ~~Draw~~
        - ~~Choice of Draw or Discard piles~~
    - ~~Lay down phase~~
        - ~~Only if not already laid down~~
        - Only if verified
            - ~~Runs~~
            - ~~Sets~~
            - ~~Color (Phase 8)~~
            - ~~Initial thought is to ask player to select cards for each requirement~~
            - Need consideration if run/set is all Wilds
    - Hit
        - Only if laid down
        - Verify
            - Consider wilds for runs, can go on front or back (2,3,4,5 -> 1 or 6)
        - Laying multiple on same run/set
    - ~~Discard~~
        - ~~Added auto-choice if only one card in hand for player convenience~~
    - Check if hand is empty (signaling round end)
        - ~~On discard~~
        - ~~On laying phase~~
        - On hitting
    - ~~If not round end, pass turn~~
- Round end
    - Total up cards in player's hands
        - 1-9 worth 5
        - 10-12 worth 10
        - Skips worth 15
        - Wilds worth 25
    - If any player finished phase 10, run game end
- Game end
    - Order players by total and share with all players
    - Not sure how to handle end/restart game yet
        - Want to remove all players from game, reset data, etc; but want to give players to option to stay on score screen
- Lots of UI work
    - Lowest priority
    - Must be mobile friendly

### Tech debt

- ~~`App.js` is already getting too large and should be broken down~~
    - Now `Round.js` is too big 🙄
- JSDoc for functions
- Code commenting!

### Stretch items

- Allow players over 6 to watch in-progress game
- Create multiple game instances
    - Probably use passcode system like Jackbox
- Allow late-comers to join in-progress game
    - They would come in sharing the worst score, at the end of the current round
- Allow people to drop
    - Along the same lines, set a timer for player turns
    - Maybe a vote-kick?
- Undo moves?
- Text log of play
- Custom rules
    - "Floating" if you must play and cannot discard
    - Certain cards act as other cards (wilds, reverses, etc)
- Game options (for host)
    - (some of the above)
    - Hide scores until end
    - Give host to another player
    - ???

## Updates

### v0.0.2 - 4/12/2020

- Most of the game and round initialization completed
    - Needs UI updates

### v0.0.1 - 4/4/2020

- Initialized app 
- Tied in firebase for creating players and adding them to the game
    - Uses local storage to avoid needing to make players authenticate
    - Assigns host to first player that joins the game
    - Max of 6 players
    - Displaying player list
- Game setup started
    - Deck generation and shuffle
- Favicon added

**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
