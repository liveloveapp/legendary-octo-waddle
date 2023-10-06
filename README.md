# Courier Demo

This is a proof-of-concept demonstrating a Courier SDK built on top of web components, with native-feeling wrappers for Angular and React.

### Structure

- SDK Implementations
  - Web: Standard web components (Location: projects/web)
  - React: React wrapper for the web components (Location: projects/react)
  - Angular: Angular wrapper for the web components (Location: projects/angular)
- Examples
  - Example apps demonstrating the usage of SDKs in various environments (Location: examples)
    - examples-web: Plain web component usage example
    - examples-react: React example using the React wrapper
    - examples-angular: Angular example using the Angular wrapper

### Prerequisites

- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm): Ensure NVM is installed to manage the Node.js version required for this project.

### Getting Started

#### Set Up the Development Environment

1. Install Node.js via NVM  
   Before proceeding, ensure you're using the correct Node.js version. Navigate to the project root and execute:

```sh
nvm use
```

2. Install Dependencies  
   Install the necessary Node.js dependencies using:

```sh
npm install
```

3. Set up your dotenv file  
   Copy `example.dotenv` to `.dotenv` and replace the example values with your Courier client ID, the user ID of a user configured in Courier, and the Courier tenant ID

### Running the Examples

You can serve the example apps using the following:

- Angular

```sh
npx nx serve examples-angular
```

- React

```sh
npx nx serve examples-react
```

- Web

```sh
npx nx serve examples-web
```
