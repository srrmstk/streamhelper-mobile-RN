import React from 'react';

import { storesContext } from 'modules/Root';

export const useRootStore = () => React.useContext(storesContext);
