
# ASTUChat - A Fully Operational Chatbot

ASTUChat is a fully operational chatbot designed as a clone of gmini AI. It is built using React, TypeScript, and Vite, providing a smooth and efficient user experience. This project aims to offer a ready-to-use chatbot that can be easily integrated and customized for various applications.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
ASTUChat is designed to provide an interactive and user-friendly chatbot experience. It leverages modern web technologies to ensure fast performance and easy customization.

## Features
- Real-time chat functionality
- Integration with various APIs
- Customizable user interface
- Easy to extend and modify
- Built with React, TypeScript, and Vite

## Installation and Setup
Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mohammed-App-creater/ASTU-intrance-project.git
   cd ASTU-intrance-project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Usage
To use ASTUChat, follow these steps:

1. **Start the Chatbot**
   - Ensure the development server is running.
   - Open your browser and navigate to the local server address (usually `http://localhost:3000`).

2. **Interact with the Chatbot**
   - Type your messages in the chat input field and press Enter.
   - The chatbot will respond in real-time based on its configured logic and API integrations.

## Configuration
To configure ASTUChat, you can modify the following files:

- **`tsconfig.node.json`** and **`tsconfig.app.json`**: Update TypeScript settings.
- **`eslint.config.js`**: Customize ESLint rules and plugins.

Example ESLint configuration:
```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Examples

Here are some example images of ASTUChat in action:

![Example Image 1](https://github.com/Moh-Sad/Advanced-Java-Project/blob/main/Screenshots/signup.png?raw=true)
![Example Image 2](https://github.com/Moh-Sad/Advanced-Java-Project/blob/main/Screenshots/login.png?raw=true)
![Example Image 2](https://github.com/Mohammed-App-creater/ASTU-intrance-project-v2/blob/main/Example%20img/Screenshot%202025-01-17%20195216.png?raw=true)
![Example Image 2](https://github.com/Mohammed-App-creater/ASTU-intrance-project-v2/blob/main/Example%20img/Screenshot%202025-01-17%20195300.png?raw=true)
![Example Image 2](https://github.com/Mohammed-App-creater/ASTU-intrance-project-v2/blob/main/Example%20img/Screenshot%202025-01-17%20195314.png?raw=true)


---
## Contributing
We welcome contributions to improve ASTUChat. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a clear message.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License
This project is licensed under the No License just if you mantion me it will be great.

---
