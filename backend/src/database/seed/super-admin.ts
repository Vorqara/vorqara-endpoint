import * as bcrypt from 'bcrypt';

export const superAdmin = async () => {
  return {
    firstName: 'Vorqara',
    lastName: 'Administrator',
    email: 'admin@vorqara.com',

    passwordHash: await bcrypt.hash(
      'Admin@12345',
      12,
    ),

    phone: '+10000000000',

    role: 'SUPER_ADMIN',

    isActive: true,

    isEmailVerified: true,
  };
};