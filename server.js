import { ApolloServer, gql } from "apollo-server";

const Users = [
  {
    id: "1",
    username: "hello there"
  },
  {
    id: "2",
    username: "hello there2"
  }
]

const Playlists = [
  {
    playlist_id: "0",
    user_id: "1",
    song_id: "never gonna"
  },
  {
    playlist_id: "0",
    user_id: "1",
    song_id: "give you up"
  }
]

const typeDefs = gql`
  type User{
    id:ID!,
    username: String!
  }
  type Playlist{
    playlist_id:ID!,
    user_id(user_id:ID):User!,
    song_id(song_id:ID):String!
  }
  type Query{ #only select query
    allUsers :[User!]!,
    allPlaylists : [Playlist!]!,
    getplaylist(playlist_id:ID!):Playlist,
    getuser(user_id:ID!): User,
    ping:String
  }
  type Mutation{ # all query without select
    createPlaylist(playlist_id:ID,user_id:ID!, song_id:String!):Playlist
  }
`

const resolvers = {
  Query: { //get
    allUsers() {
      return Users;
    },
    ping() {
      return "pong"
    },
    getuser(root, args) {
      console.log(args)
      return Users.find(e => e.id === args.user_id);
    },
    allPlaylists() {
      return Playlists
    }
  },
  Mutation: { //everything without get
    createPlaylist(_, { playlist_id, user_id, song_id }) {
      const news = {
        playlist_id: playlist_id,
        user_id: user_id,
        song_id: song_id
      };
      Playlists.push(news);
      return news;
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(url)
})