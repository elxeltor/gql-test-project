# Important notice

## Implementation choices
- Alternative to login. Since implementing a login was not part of the scope, I worked around using a userId in some queries/mutations
- I'm using `apollo-server` instead of `apollo-server-express` since i didn't need any `express` features that wasn't yet supported. Also, it's an easy fix.
- There's no Message model. Although it would be mandatory in a real product, it doesn't have much sens in this project. The message is bound to a forum (it's the only way to access it) and is immutable.
- There are 2 init methods for the DB (init and seed). Since the DB is persistent we could remove the seed step (that resets the data) on every server start.
- Babel for packaging the code. That's purely for my own convenience, I like some of the features it provides.
- Yarn vs Npm. I initially used `yarn` as a package manager (and it's still my preference), but I changed to `npm` assuming it would be easier for anyon to test my code with `npm`. If it's not, just revert the commit `cf37373563fd4294fe1a341fb29458b3ec9e1ba8`


## GraphQL schema:
```graphql
type Query {

  # Gets a single Forum
  getForum(id: ID!): Forum!

  # Lists all available Forums
  listForums: [Forum]!

  # Lists all messages of a forum
  listForumMessages(id: ID!): [Message!]!

  # Information of the current (logged in) User
  me: User!

  # Information of the requested User
  getUser(id: ID!): User!
}

type Mutation {

  # Creates a Forum (userId emulates the authentication)
  createForum(userId: ID!, input: CreateForumInput!): Forum!

  # Allows a user to join a Forum (userId emulates the authentication)
  joinForum(userId: ID!, forumId: ID!): Forum!

  # Posts a new message to a forum (userId emulates the authentication)
  postMessage(userId: ID!, forumId: ID!, input: MessageInput!): [Message!]!

  # Creates a User
  createUser(input: CreateUserInput!): User!
}

type Forum {

  # Forum's ID
  id: ID!

  # Forum's title
  title: String!

  # Forum's list of Messages (ordered by moste recent)
  messages: [Message]!

  # Participants that joined in that forum
  participants: [PublicUser!]!
}

input CreateForumInput {

  # Forum's title
  title: String!
}

type Message {

  # Message's timestamp of creation
  timestamp: String!

  # Message's author
  author: PublicUser!

  # Message's body content
  body: String!
}

input MessageInput {

  # Message body
  body: String!
}

type User {

  # User's ID
  id: ID!

  # User's name
  displayName: String!

  # User's age
  age: Int!

  # List of forums the user has joined
  forums: [Forum]!
}

type PublicUser {

  # User's ID
  id: ID!

  # User's name
  displayName: String!

  # User's age
  age: Int!
}

input CreateUserInput {

  # User's name
  displayName: String!

  # User's age (optional)
  age: Int
}

schema {
  query: Query
  mutation: Mutation
}

```
