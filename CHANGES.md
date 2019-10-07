# The new GraphQL schema

## Diff
```graphql
type Query {
  # Lists pending join requests to a forum (userId emulates the authentication)
  listJoinForumRequests(userId: ID!): [JoinForumRequest]!
}

type Mutation {
  # Processes join requests and sends a confirmation to the accepted user (if applicable). (userId emulates the authentication)
  processJoinForumRequest(userId: ID!, forumId: ID!, requestsResponses: [ForumRequestResponse!]!): Forum!
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

  # Forum's privacy
  privacy: Privacy!
}

type JoinForumRequest {
  requesterId: ID!
}

input CreateForumInput {

  # Forum's title
  title: String!

  # Forum's privacy
  privacy: Privacy!
}

input ForumRequestResponse {
  requesterId: ID!
  responseStatus: ForumResponseStatus!
}

enum ForumResponseStatus {
  accepted
  rejected
}

enum Privacy {
  public
  private
}
```

## Full schema
```graphql
type Query {

  # Gets a single Forum
  getForum(id: ID!): Forum!

  # Lists all available Forums
  listForums: [Forum]!

  # Lists pending join requests to a forum (userId emulates the authentication)
  listJoinForumRequests(userId: ID!): [JoinForumRequest]!

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

  # Processes join requests and sends a confirmation to the accepted user (if applicable). (userId emulates the authentication)
  processJoinForumRequest(userId: ID!, forumId: ID!, requestsResponses: [ForumRequestResponse!]!): Forum!

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

  # Forum's privacy
  privacy: Privacy!
}

type JoinForumRequest {
  requesterId: ID!
}

input CreateForumInput {

  # Forum's title
  title: String!

  # Forum's privacy
  privacy: Privacy!
}

input ForumRequestResponse {
  requesterId: ID!
  responseStatus: ForumResponseStatus!
}

enum ForumResponseStatus {
  accepted
  rejected
}

enum Privacy {
  public
  private
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

