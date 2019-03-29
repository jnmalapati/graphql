const { graphql,
  buildSchema
} = require('graphql');

const axios = require('axios');

const schema = buildSchema(`
    type Team {
      id: ID
      name: String
      points: Int
    }

    type Query {
      teams: [Team]
    }
`);

const resolvers = {
  teams: () => {
    return axios
      .get(`https://graphqlvoting.azurewebsites.net/api/score`)
      .then(res => res.data)
  }
}

graphql(schema, '{teams {id name points}}', resolvers).then(res => console.log(JSON.stringify(res)));