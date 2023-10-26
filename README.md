# To-Do List Web Application

This is a simple web application for managing to-do lists. It is built using Node.js, Express, and MongoDB to store and manage your tasks.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed:

- Node.js: You can download and install it from [nodejs.org](https://nodejs.org/).

### Installing

1. Clone this repository to your local machine.

```shell
git clone https://github.com/mariannatsapali/to-do-list.git
```

2. Install the required npm packages by navigating to the project folder and running the following command:

```shell
npm install
```

### Setting up MongoDB

The application uses MongoDB to store to-do items. You'll need to set up a MongoDB database and provide the connection URL. Update the MongoDB connection URL in the `mongoose.connect` line in your code:

```javascript
mongoose.connect("mongodb+srv://your-connection-url/toDoListDB");
```

### Running the Application

Start the application with the following command:

```shell
npm start
```

The app will run on port 3000 by default. You can access it in your web browser at [http://localhost:3000](http://localhost:3000).

## Usage

- Access the application in your web browser.
- Add and manage your to-do items.
- Create custom lists for different categories or projects.

## Built With

- Node.js - A JavaScript runtime
- Express - A Node.js web application framework
- MongoDB - A NoSQL database for data storage

## Acknowledgments

This project was created as part of a web development course.

## License
```shell
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```
