const graphql = require('graphql');
const Listings = require('../models/listings.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = graphql;

const ListingType = new GraphQLObjectType({
  name: 'Listing', 
  fields: () => ({
    id: { type: GraphQLInt}, 
    imageUrl: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    zipcode: { type: GraphQLInt },
    price: { type: GraphQLInt },
    numOfReviews: { type: GraphQLInt },
    avgRating: { type: GraphQLFloat},
    listings:{
      type: new GraphQLList(ListingType),
      resolve(parent,args){
        return Listings.find({ price: { $gt: parent.price - 10, $lt: parent.price + 10 }, avgRating: { $gt: parent.avgRating - 0.5, $lt: parent.avgRating + 0.5 }, zipcode: { $gt: parent.zipcode - 10, $lt: parent.zipcode + 10 } })
          .where({ id: { $ne: parent.id } })
          .sort({ avgRating: -1 })
          .limit(12);
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () =>({
    listing: {
      type: ListingType,
      args: {id: {type: GraphQLInt}},
      resolve(parent , args){
        return Listings.findOne({id: args.id});
      }
    },

    // listings:{
    //   type: new GraphQLList(ListingType),
    //   resolve(parent,args){
    //     return 
    //   }
    // }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})