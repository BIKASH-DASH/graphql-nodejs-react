const graphql = require('graphql')



const _ = require('lodash');


const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList

} = graphql;

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorsId: "1" },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorsId: "1" },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorsId: "2" },
    { name: 'Name of the Star', genre: 'Fantasy', id: '1', authorsId: "1" },
    { name: 'The Final temple', genre: 'Fantasy', id: '2', authorsId: "1" },
    { name: 'The Final Book', genre: 'Sci-Fi', id: '3', authorsId: "2" }
]

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: "1" },
    { name: 'Brandon Sanderson', age: 42, id: "2" },
    { name: 'Terry Pratchett', age: 66, id: "3" },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authors: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, { id: parent.authorsId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent);
                return _.filter(books, { authorsId: parent.id })
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //args.id
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }

        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
});