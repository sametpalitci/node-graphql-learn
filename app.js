const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLInt } = require('graphql');

const employees = [{
        id: 1,
        name: 'Test1',
        email: 'test1@test.com'
    },
    {
        id: 2,
        name: 'Test2',
        email: 'test2@test.com'
    },
    {
        id: 3,
        name: 'Test3',
        email: 'test3@test.com'
    }
];
const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employees: {
            type: new GraphQLList(EmployeeType),
            args: {},
            resolve() {
                return employees
            }
        }
    }
})
const schema = new GraphQLSchema({
    query: rootQuery
})
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));