**Purpose**
To create an application that pulls data from Spotify, Twitter, and OMDB through node's `process.argv`. This application works by assigning the arguments put into node with the command line as commands and search parameters depending on the positioning of the arguments used in the comand line.

**Installation/Keys**
The `package.json` file will have all of the npm installations required listed under `"dependencies"`. Run `npm install <package name(s) here>` in the command line for code functionality. 

The keys can be put into a created file named `.env`, which may be the easiest way to test functionality with how this is set up. The inside of the `.env` file should look like this: 

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

**Twitter Username**
I used an old Twitter account back from when I was more emotionally motivated. It is recommended that you change the username `"DreamWlkr64"` under the function `gitTwits()` that is declared uner the parameter `"q"` on line `23` in `liri.js`. If, instead, you wish to view my tweets that were made in a different era, feel free to keep this the same.

**Under the Hood**
The functions in this little project are fairly straight-forward. The `if statement` after all of the variable declarations is responsible for concatenating all of the node arguments at and after the fourth index position for a readable search parameter for the functions, that uses a search paramater, to use.

* **The main functions**
  
    * *gitTwits()* `Called with "my=tweets` Pulls the latest 20 tweets from Twitter and displays them in the console.

    * *spottySong()* `Called with "spotify-this-song <query here>` Searches Spotify for the song specified and displays the results in the console

    * *omgMove* `Called with "movie-this <query here>` Searches OMBD for a movie by putting the search parameter in a readable format for OMDB and displays the results in the console

    * *stalkerLogger()* logs the user's actions by appending them to a file named `"node-logs"` (node-logs will be created if it doesn't already exist)

    * *Switch Statement* the switch statement at the end of `liri.js` takes in the first argument from node provided by the user and executes the functions in accordance with the user input. Whatever the user inputs, as long as the action is valid, `stalkerLogger()` is executed regardless if the search parameter is valid or invalid. 

      * *do-what-it-says*

        * The last option in the switch statement at the end of `liri.js` utilizes `doIt()`, which will later call `doItSwitcher`, to carry out one of three options with their corresponding search parameters stored in random.txt. Executed with `do-what-it-says <number here>`.

          * *doIt()* `doIt()` takes in an argument and is used in the `fs.readFile()` function. The file contents are organized with a pipe between each set of instructions so the function can split it accurately. `doItSwitcher()` is called at the end of this function.

          * *doItSwitcher* has a switch statement that has all of the cases as the switch statement at the end. The only one it doesn't have is `do-what-it-says` as to avoid recursion. 

        * `random.txt` can be swapped with `node-logs` to execute an action previously carried out.




