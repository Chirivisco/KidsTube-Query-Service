const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        phone: String!
        name: String!
        country: String
        birthdate: String!
        profiles: [Profile!]
        createdAt: String!
        updatedAt: String!
    }

    type Profile {
        id: ID!
        fullName: String!
        pin: String!
        avatar: String
        user: User!
        role: String!
        playlists: [Playlist!]
        createdAt: String!
        updatedAt: String!
    }

    type Video {
        id: ID!
        name: String!
        url: String!
        description: String
        playlist: Playlist
        createdAt: String!
        updatedAt: String!
    }

    type Playlist {
        id: ID!
        name: String!
        description: String
        profiles: [Profile!]
        videos: [Video!]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        profiles: [Profile!]!
        profile(id: ID!): Profile
        videos: [Video!]!
        video(id: ID!): Video
        playlists: [Playlist!]!
        playlist(id: ID!): Playlist
    }
`;

module.exports = typeDefs; 