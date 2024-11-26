import styled from 'styled-components/native';

import { AppText } from '../../../components/AppText';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { EColors } from '../../../theme/colors';

export const Container = styled(ScreenContainer)`
  justify-content: center;
  background-color: ${EColors.Primary1};
`;

export const Title = styled(AppText)`
  font-size: 32px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 24px;
  color: ${EColors.Secondary};
  text-transform: uppercase;
`;
