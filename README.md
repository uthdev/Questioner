# The Questioner

Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## Build Status

[![Build Status](https://travis-ci.org/uthdev/andela_questioner_challenge.svg?branch=develop)](https://travis-ci.org/uthdev/andela_questioner_challenge)
[![Coverage Status](https://coveralls.io/repos/github/uthdev/andela_questioner_challenge/badge.svg?branch=develop)](https://coveralls.io/github/uthdev/andela_questioner_challenge?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/4d3d3ddd0fb69506c98d/maintainability)](https://codeclimate.com/github/uthdev/andela_questioner_challenge/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4d3d3ddd0fb69506c98d/test_coverage)](https://codeclimate.com/github/uthdev/andela_questioner_challenge/test_coverage)

Preview UI template here[ UI Template](https://uthdev.github.io/andela_questioner_challenge/UI/index.html)


## Style guide

[Airbnb ](http://link)(Javascript style guide)

### Tech Stack

- [Nodejs](http://nodejs.org)
- [Expressjs](http://expressjs.com)
- [Mocha](http://mocha.com)
- [Chai](http://chai.com)
- [moment](http://moment)

## Required Features

- Admin can create meetups.
- Users can create an account and log in.
- Users can post questions to a specific meetup.
- Users can upvote or downvote a question.
- Questions are sorted based on the number of upvotes a question has, which helps the
  meetup organizer(s) to prioritize questions most users are interested in.
- Users can post comments to a specific question.

## Optional Features

- Admin can add images to a meetup record.
- Admin can add tags to a meetup record.

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

```
git clone https://github.com/uthdev/andela_questioner_challenge.git
```

And install the required dependencies

```
npm install
```

Run server

```
npm run dev
```

Server listens on port `5000`

## Running the tests

To run test cases

```
npm test
```

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET api/v1/meetups</td>
<td>Fetch all meetups</td>
</tr>
<tr>
<td>GET api/v1/meetups/upcoming</td>
<td>Fetch all upcoming meetups</td>
</tr>
<tr>
<td>GET api/v1/meetups/:meetupId</td>
<td>Fetch the details of a specific meetup</td>
</tr>
<tr>
<td>POST api/v1/questions</td>
<td>Post a question</td>
</tr>
<tr>
<td>POST api/v1/meetups</td>
<td>Create a meetup</td>
</tr>
<tr>
<td>PATCH api/v1/questions/:id/upvote</td>
<td>Upvote a Question</td>
</tr>
<tr>
<td>PATCH api/v1/questions/:id/downvote</td>
<td>Downvote a Question</td>
</tr>
<tr>
<td>DELETE api/v1/meetups/:id/</td>
<td>Delete a Specific meetup</td>
</tr>
<tr>
<td>POST api/v1/meetups/:id/rsvps</td>
<td>RSVP to a meetup</td>
</tr>
<tr>
<td>POST api/v1/auth/signup</td>
<td>User can Sign Up</td>
</tr>
<tr>
<td>POST api/v1/auth/login</td>
<td>User can login</td>
</tr>
</tbody></table>

## Author

[Adeleke Gbolahan](http://github.com/uthdev)

## Acknowledgments

- [Andela](http://andela.com)
- [Brad Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
- [Google Search](https://google.com)
- [Stackoverflow](stackoverflow.com)
- [Mohammed Mosh]
- Hat tip to everybody who supported

### Live demo

You can test the api endpoints

- [Here ](https://caniask.herokuapp.com/api/v1)
