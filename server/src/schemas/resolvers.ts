import type IUserContext from '../interfaces/UserContext.js';
import type IUserDocument from '../interfaces/UserDocument.js';
import type IItemInput from '../interfaces/ItemInput.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth-service.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      
      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password') as IUserDocument;
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
  Mutation: {
    addUser: async (_parent: any, args: any): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
            
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addItem: async (_parent: any, { itemData }: { itemData: IItemInput }, context: IUserContext): Promise<IUserDocument | null> => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { items: itemData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('User not authenticated');
    },
    removeItem: async (_parent: any, { itemId }: { itemId: string }, context: IUserContext): Promise<IUserDocument | null> => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { items: { itemId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('User not authenticated');
    },
  },
};

export default resolvers;
