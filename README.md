# tv-series

Personal project to store information about the tv series I watch and its statistics.
This project is inspired by the [TV TIME](https://www.tvtime.com/) application, where you can keep track of the shows you are watching and the ones you will. Additionaly I wanted to know statistics about the shows like how many episodes I am watching per day, how many day took me to watch all episodes, or how many times I choose a character as my favorite in one episode over the episodes.  
I took the series, characters and actor pictures from [The Movie Database](https://themoviedb.org) and [TV Maze](https://tvmaze.com).  
Yeah, I love TV Series and statistics, so I decided to make this project.

WIP: A better-loking web interface, and incorporate statistics (currenty using the Python file in the root path for statistics, that was the one used before for store the tv series in the DB).

## Starting the project in a development build

To build the project you have to install ReactJS, NodeJS and a PostgreSQL database, the script to create the tables of the DB is in the root folder in the file `database_script.sql`.  
  
In the path `\tv-series\postgresql-rest-api\app\config` create a `db.config.js` file and write the following lines with your configuration to connect to the database.

```js
module.exports = {
    HOST: "localhost",
    USER: "?",
    PASSWORD: "?",
    DB: "reactSERIES",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
```

Then create a .env file in `\tv-series` with the following properties, including your API KEY to [TheMovieDatabase](https://www.themoviedb.org/documentation/api). (Free API)

To use TheTVDB you have to pay a suscription


```
REACT_APP_TVDB_API_KEY=your_thetvdb_api_key
REACT_APP_TVDB_PIN=your_thetvdb_pin
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

Then go to the root folder of the project and type the following commands.

To start the REST API that interacts with the database  
`cd postgresql-rest-api`

Install the dependencies (only the first time)  
`npm install`  

Once installed type  
`node server.js`

To start the ReactJS project, in the root folder type.  
`cd tv-series`  

Install the dependencies (only the first time)  
`npm install`  

Once installed type  
`npm start`

Then in your browser go to localhost:3000 or local address indicated in the terminal.