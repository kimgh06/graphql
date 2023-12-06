import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User{
    id:Int,
    username: String
  }
  type Playlist{
    playlist_id:Int,
    user_id:User,
    song_id:String
  }
  type Query{
    allUsers :[User],
    allPlaylists : [Playlist],
    playlist(playlist_id:Int):Playlist
  }
`

const server = new ApolloServer({ typeDefs })

server.listen().then(({ url }) => {
  console.log(url)
})