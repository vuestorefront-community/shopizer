import { UserGetters } from '@vue-storefront/core';
import type { User } from '@vue-storefront/shopizer-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFirstName(user: User): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLastName(user: User): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFullName(user: User): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEmailAddress(user: User): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAuthenticated(user: User): any {
  return user;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getUserData(user: User): any {
  return user;
}

export const userGetters: UserGetters<User> = {
  getFirstName,
  getLastName,
  getFullName,
  getEmailAddress,
  getAuthenticated,
  getUserData
};
