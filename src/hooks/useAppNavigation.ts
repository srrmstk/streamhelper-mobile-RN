import { StackNavigationProp } from '@react-navigation/stack';
import {
  ParamListBase,
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { TRootNavigator } from '../navigation/Root/types';

export const useAppNavigation = () => {
  return useNavigation<
    CompositeNavigationProp<
      StackNavigationProp<ParamListBase, string>,
      StackNavigationProp<TRootNavigator>
    >
  >();
};
