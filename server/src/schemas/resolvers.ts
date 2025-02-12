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

    deleteCollection: async (_parent: any, { collectionId }: { collectionId: string }, context: any) => {
      if (context.user) {
        
        const deletedCollection = await Collection.findByIdAndDelete(collectionId).exec();
    
        return deletedCollection;

      }
      throw new AuthenticationError('User not authenticated');
    },

    addItem: async (_parent: any, { collectionId, name, description, price }: { collectionId: string; name: string; description: string; price: number }, context: any) => {
      if (context.user) {

        console.log('collectionId:', collectionId);

        const item = new Item({
          name,
          description,
          price,
        });

        await item.save();
        const newCollection = await Collection.findByIdAndUpdate(
          collectionId,
          { $push: { items: item._id } },
          { new: true }
        );  

        return newCollection

      }
    
      throw new AuthenticationError('User not authenticated3');
    },

    deleteItem: async (
      _parent: any,
      { collectionId, itemId }: { collectionId: string; itemId: string },
      context: any
    ) => {
      console.log('Incoming deleteItem request:', { collectionId, itemId });
    
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      if (!collectionId || !itemId) {
        throw new Error('collectionId and itemId are required');
      }
    
      const updatedCollection = await Collection.findByIdAndUpdate(
        String(collectionId), // Ensure it's a string
        { $pull: { items: String(itemId) } }, // Ensure itemId is a string
        { new: true }
      );
    
      if (!updatedCollection) {
        throw new Error('Collection not found');
      }
    
      console.log('Updated Collection after deleteItem:', updatedCollection);
    
      return updatedCollection; // ✅ Ensure the return type matches your GraphQL schema
    },

    // adds the user
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