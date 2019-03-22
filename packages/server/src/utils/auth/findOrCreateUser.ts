import { User } from '../../entities/User';

export const findOrCreateUser = async (user: User, provider: keyof User) => {
  const existingUser = await User.findOne({ [provider]: user[provider] });
  if (existingUser) return existingUser;

  // Link accounts
  const existingEmailUser = await User.findOne({ email: user.email });
  if (existingEmailUser) {
    existingEmailUser[provider] = user[provider];
    return existingEmailUser.save();
  }

  return user.save();
};
