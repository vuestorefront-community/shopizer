import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User } from '@vue-storefront/shopizer-api';
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';

const params: UseUserFactoryParams<User, UpdateParams, RegisterParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    console.log('Mocked: useUser.load', process.client);
    let token;
    if (process.client) {
      token = localStorage.getItem('token');
    }
    const user: any = await context.$shopizer.api.getProfileData(token);
    console.log(user);
    return user;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    console.log('Mocked: useUser.logOut');
    localStorage.removeItem('token');
    if (localStorage.getItem('cartId')) {
      localStorage.removeItem('cartId');
    }
    await params.load(context);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, dataReg: any) => {
    console.log('Mocked: useUser.register');
    delete dataReg.customQuery;
    const data: any = await context.$shopizer.api.register(dataReg);
    // console.log(data)
    if (data.code === 200) {
      localStorage.setItem('token', data.data.token);
      await params.load(context);
      return data;
    } else {
      throw {
        data
      };
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }: any) => {
    console.log('Mocked: useUser.logIn');
    const loginData: any = await context.$shopizer.api.login({ username, password });
    if (loginData.code === 200) {
      localStorage.setItem('token', loginData.data.token);
      await params.load(context);
      return loginData;
    } else {
      throw {
        message: loginData.message
      };
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: useUser.changePassword');
    return {};
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
