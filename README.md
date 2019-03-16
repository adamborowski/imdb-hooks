This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation guide

First you need to have node >= 8 installed.
Then type in terminal `npm install`

# Initial decisions

Due to [lack of person search feature](https://github.com/omdbapi/OMDb-API/issues/37) I've decided to use TMDB instead of OMDB.

The overall architecture of the application is similar to one I developed in Nordea and was adopted by some other teams.

## Tech stack

Despite the scope of the task is relatively small, I've chosen some solutions that scale, just for demonstration purposes.

| Technology        | description                                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react             | functional UI runtime                                                                                                                                                                                                                          |
| typescript        | Great solution to develop scalable applications. No prop-types (WebStorm doesn't autocomplete types declared in other files). No dummy unit tests. Great developer experience but high learning curve, especially when it comes to HOC typing. |
| redux             | predictable state container - adds a bit of code overhead but makes it easier to track what happens and why                                                                                                                                    |
| redux-react-hooks | experimental API to use hooks instead HOCs when reading data from the store                                                                                                                                                                    |
| ant design        | just one of design languages with primary support for React                                                                                                                                                                                    |
| react-router@4.4  | beta version of router using new Context API allows to inject router data in hooks                                                                                                                                                             |
| typesafe-actions  | strong-typed action creators that reduce amount of redux boilerplate                                                                                                                                                                           |
| rxjs              | declarative streams of asynchronous flows in the app (no thunks, no sagas)                                                                                                                                                                     |
| styled-components | component-oriented environment to style React components (no scss, less or css files, no inline styles). One of css-in-js solutions. It resolves to efficient style tags.                                                                      |
| storybook         | great tool to develop your components in isolation to the real application. Read more about [component-driven development](https://blog.hichroma.com/component-driven-development-ce1109d56c8e?gi=335077bf07e2)                                |
| prettier          | A smart tool to do code autoformatting                                                                                                                                                                                                         |

## feature-first structure

Despite the simplicity of this application I've decided to put whole code into one feature just to show my intention to grow the application.
A feature is a directory which groups all types of modules related to one business case.
For example, movie browser is one feature and user profile is another.
Each feature should be encapsulated and there are no imports between modules from different features. The only exception is the call of redux action and route factories from routing.ts
The code which is reusable, is placed under common directory.

Features are integrated with the appliaction by plugins. A plugin is just a exported unit which is read in some pluggable area (root reducer, main router switch, etc)

# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
