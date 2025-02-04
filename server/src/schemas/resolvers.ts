import User from "../models/User.js";
import Collection  from "../models/Collection.js";
import Item  from "../models/Item.js";
import { signToken, AuthenticationError } from '../services/auth-service.js';

const resolvers = {
  Query: {

    me: async (_parent: any, _args: any, context: any) => {
      
      // Return the user with the collections populated and the items populated under collections in one object.
      if (context.user && context.user._id) {
        const user = await User.findById(context.user._id).populate({ path: 'collections', populate: { path: 'items' } }).exec();
        return user;
      }
      throw new AuthenticationError('User! not authenticated3');
    },  
    
    
    
    // gets the current users collections
    // getCollections: async (_parent: any, _args: any, context: any) => {
    //   console.log('im here:');
    //   if (context.user) {
    //     // JUST print the user ID.
    //     console.log('User ID:', context.user["_id"]);
    //     const user = await User.findById(context.user._id).populate('collections').exec();
        
    //     if (user) {
    //       return user.collections;
    //     } else {
    //       throw new AuthenticationError('User not found');
    //     }

    //   }
    //   console.log('out here');
    //   throw new AuthenticationError('User not authenticated3');
    // },

    // get a specific collection by id #
    // getCollectionById: async (_parent: any, { collectionId }: { collectionId: string }, context: any) => {
    //   if (context.user) {
    //     const collection = await Collection.findById(collectionId).exec();
    //     return collection;
    //   }
    //   throw new AuthenticationError('User not authenticated3');
    // },

    // get all items from a collection
    // getItemsInCollection: async (_parent: any, { collectionId }: { collectionId: string }, context: any) => {
    //   if (context.user) {
    //     const collection = await Collection.findById(collectionId).populate('items').exec();
    //     return collection?.items;
    //   }
    //   throw new AuthenticationError('User not authenticated3');
    // },
  },

  Mutation: {
    // make a new collection
    createCollection: async (_parent: any, { title, description, image }: { title: string; description: string; image: string }, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated3');
      }
    
      try {
        const newCollection = await Collection.create({
          title,
          description,
          image,
        });

        // add under user.
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { collections: newCollection._id } },
          { new: true }
        );
    
        return newCollection;

      } catch (error) {
        console.error('Error creating collection:', error);
        throw new Error('Failed to create collection');
      }
    },

    // Add item to a collection
    addItemToCollection: async (_parent: any, { collectionId, name, description, price }: { collectionId: string; name: string; description: string; price: number }, context: any) => {
      if (context.user) {

        console.log('collectionId:', collectionId);

        const item = new Item({
          name,
          description,
          price,
        });
        await item.save();

        console.log('item:', item);
    
        const newCollection = await Collection.findByIdAndUpdate(
          collectionId,
          { $push: { items: item._id } },
          { new: true }
        );

        console.log('newCollection:', newCollection);
    
        // if (!updatedCollection) {
        //   throw new Error('Collection not found');
        // }
    
        // return {
        //   collectionId: updatedCollection._id,
        //   title: updatedCollection.title,
        //   description: updatedCollection.description,
        //   image: updatedCollection.image,
        //   items: updatedCollection.items,
        // };

        return newCollection

      }
    
      throw new AuthenticationError('User not authenticated3');
    },

    // deletes an item from a collection
    // removeItemFromCollection: async (_parent: any, { collectionId, itemId }: { collectionId: string; itemId: string }, context: any) => {
    //   if (context.user) {
    //     const updatedCollection = await Collection.findByIdAndUpdate(
    //       collectionId,
    //       { $pull: { items: itemId } },
    //       { new: true }
    //     );

    //     return updatedCollection;
    //   }
    //   throw new AuthenticationError('User not authenticated3');
    // },

    // add a user
    addUser: async (_parent: any, args: any) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // User login (authenticate)
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
  },
};

export default resolvers;