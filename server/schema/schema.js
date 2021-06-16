const {graphql,GraphQLString} = require('graphql')


const {GraphQLObjectType} = graphql ;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id:{type:GraphQLString},
        name: {type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

