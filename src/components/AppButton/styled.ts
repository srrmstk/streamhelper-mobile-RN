import { AppText } from 'components';
import styled from 'styled-components/native';
import { EColors } from 'theme/colors';

export const PressableContainer = styled.TouchableOpacity`
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${EColors.Primary2};
`;

export const Text = styled(AppText)`
  text-align: center;
`;
