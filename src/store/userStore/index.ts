import { createStore } from '../createStore';
import { UserState } from '../interfaces';
import { userSlice } from './user.slice';

export const useUserStore = createStore<UserState>([userSlice], {
  name: 'user',
});
