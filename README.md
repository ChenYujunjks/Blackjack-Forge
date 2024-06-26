# Blackjack Game Client

## Overview

Blackjack Game Client is a web application that allows users to play the popular casino game, Blackjack, directly from their browser. Users can register and log in to track their game statistics and compete with other players. The application aims to provide a fun and interactive Blackjack experience with features such as live scores, player rankings, and game history.

## Data Model

The application will store Users, Games, and Game Moves:

* Users can have multiple games (via references).
* Each game can have multiple moves (embedded for speed).

### Sample Documents

An Example User:

```javascript
{
  username: "playerOne",
  hash: // a password hash,
  email: // users' email to reset password
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object,
  game_id: "game123",
  moves: [
    { move: "hit", card: "K Spades", move_time: },// timestamp 
    { move: "stand", move_time:  } // timestamp
  ],
  status: "ongoing",
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/register - page for user to register an account

![list create](documentation/register.png)

/login - page for users to login their account

![list](documentation/login.png)

/list/slug - page for showing user playing blackjack

![list](documentation/game.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can choose the amount of chips I want to top up
4. as a user, I can start play blackjack with the dealer (computer)
5. as a user, I can split deck if I want to when I see my hands

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)

