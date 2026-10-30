'use client';

import { createContext } from 'react';
import { Setting } from '../../types/Setting';

export const SettingsContext = createContext<Setting[]>([]);
