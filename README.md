# Lam-store

The Lam-store is a versatile and powerful desktop application built with Electron and React, allowing users to perform various tasks through a single, centralized platform. Users can install and use different apps within the main app, which is powered by a chat interface (currently using ChatGPT). The supported apps can be developed in multiple programming languages, such as Node.js, Python, and others. Each app should include a binary file, a manifest JSON, a logo, and any additional assets that may be required. The All-in-One App utilizes Node.js child processes for efficient communication with the installed apps, ensuring seamless integration and a smooth user experience.

## Table of Contents

- [Lam-store](#lam-store)
  - [Table of Contents](#table-of-contents)
  - [Getting Started ](#getting-started-)
    - [Prerequisites ](#prerequisites-)
    - [Installation ](#installation-)
  - [How It Works ](#how-it-works-)
  - [Current Challenges \& Future Work ](#current-challenges--future-work-)
  - [Usage ](#usage-)
  - [App Development ](#app-development-)
    - [App Structure  ](#app-structure--)
    - [Manifest JSON ](#manifest-json-)
  - [Contributing ](#contributing-)
  - [License ](#license-)

## Getting Started <a id="getting-started"></a>

These instructions will provide you with a copy of the project and help you set up your environment to run the All-in-One App.

### Prerequisites <a id="prerequisites"></a>

- Node.js (>= 18.x.x)

- Python (>= 3.8.x)

- Git

### Installation <a id="installation"></a>

1. Clone the repository:

```bash
git clone https://github.com/ahmed3520/lam-store
```
2. Navigate to the project directory:
```
cd lam-store
```
3. Install the required dependencies
```
npm install
```
4. Run the application:
```
npm start
npm start-forge
```
## How It Works <a id="how-it-works"></a>

Lam-store is designed to provide a seamless user experience by integrating multiple apps within a single platform. The main app serves as a chat interface, powered by ChatGPT, which allows users to interact with the installed apps. Each app is developed independently and can be written in various programming languages, such as Node.js, Python, and others.

When a user interacts with the chat interface, their input is passed to ChatGPT, which classifies the input. If the input is a normal message, ChatGPT responds accordingly. If the input is a task, ChatGPT generates a JSON object containing the task and relevant keywords, like this:

```json
{
  "task": "open the translator",
  "task_keywords": ["translator", "open", "language"]
}
```

The All-in-One App then filters the available apps list using the keywords provided by ChatGPT. The filtered app list and the task are sent back to ChatGPT to calculate the probability of the best app that fits the user's task.

Once the best app is identified, it is retrieved from the apps directory, and the task and arguments are passed to a child process file. This child process file interacts with the app, processes the user's request, and returns the output, which is displayed in the chat interface.

This modular design enables developers to create and integrate new apps easily, while users can enjoy a unified experience across multiple apps without needing to switch between different platforms.
## Current Challenges & Future Work <a id="current-challenges"></a>
As the All-in-One App project continues to evolve, we are actively working on addressing the following challenges and improvements:

1.  **Argument Extraction**: Developing a method to extract arguments from user tasks and pass them to the appropriate app for processing.
    
2.  **App Selection Algorithm**: Improving the app selection algorithm to increase efficiency and reduce the reliance on large language models (LLMs) for determining the best app to handle a user's task.
    
3.  **Developer Platform**: Creating a platform for developers to upload their apps, store them in cloud storage, and allow users to download the apps (including the binary file and the manifest.json).
    
4.  **User Interface Enhancements**: Continuously improving the user interface to support additional input types, such as voice, photos, videos, and files.
    

We are committed to addressing these challenges and enhancing the All-in-One App's capabilities. We welcome feedback and contributions from the community to help us achieve our goals and create a better user experience.
## Usage <a id="usage"></a>
After setting up the  App, users can access the main chat interface to interact with the installed apps. To install new apps, follow the app installation process provided by each individual app.
## App Development <a id="app-development"></a>
Developers can create apps for the All-in-One App using various programming languages. Each app must follow the required app structure and include necessary files.
### App Structure  <a id="app-structure"></a>
An app should include the following files:
-   Executable binary file (e.g., .exe or any other supported language)
-   Manifest JSON (a JSON file containing app metadata)
-   Additional assets (if required)

For Node.js apps, we recommend using [pkg](https://github.com/vercel/pkg) to package the app into an executable binary file. For Python apps, we recommend using [PyInstaller](https://pyinstaller.org/en/stable/) to create a standalone executable binary file.

### Manifest JSON <a id="manifest-json"></a>

The manifest JSON should contain relevant metadata for the app, such as:

```json
{
    "schema_version":"v1",
    "name_for_model":"alarm",
    "name_for_human":"Dummy Alarm",
    "description_for_human":"Simple Alert that beep when alarm finish",
    "description_for_model":"Use this app when user ask you to set an alarm. this app takes HH:MM as arguments",
    "entry_functions":[
       {
          "function_name":"set_alarm",
          "arguments":[
             {
                "name":"time",
                "type":"string",
                "description":"The time to set the alarm for in HH:MM format"
             }
          ]
       }
    ],
    "logo_url":"https://i.ibb.co/1fB8M4D/alarm-icon.png",
    "contact_email":"alarm@test.com",
    "legal_info_url":"test.com"
 }
```

## Contributing <a id="contributing"></a>

We welcome and appreciate contributions from the community. To contribute:

1.  Fork the repository.
2.  Create a new branch with a descriptive name.
3.  Make your changes and commit them with a meaningful commit message.
4.  Push your changes to your fork.
5.  Create a pull request with a detailed description of the changes.

## License <a id="license"></a>

This project is licensed under the MIT License. See LICENSE for more information.
