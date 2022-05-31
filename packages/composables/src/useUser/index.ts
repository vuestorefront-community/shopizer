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
    console.log('Mocked: useUser.load');
    return 'jaimin';
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    console.log('Mocked: useUser.logOut');
    localStorage.removeItem('token');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, params: any) => {
    console.log('Mocked: useUser.register');
    delete params.customQuery;
    const data: any = await context.$shopizer.api.register(params);
    // console.log(data)
    if (data.code === 200) {
      localStorage.setItem('token', data.data.token);
    }
    throw {
      data
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }: any) => {
    console.log(password, 'Mocked: useUser.logIn', username);
    const loginData: any = await context.$shopizer.api.login({ username, password });
    console.log(loginData.code);
    if (loginData.code === 200) {
      localStorage.setItem('token', loginData.data.token);
    }
    throw {
      loginData
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: useUser.changePassword');
    return {};
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
