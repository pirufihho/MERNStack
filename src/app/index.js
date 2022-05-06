import { createRoot } from 'react-dom/client';
import React, {Component} from 'react';
import AppCabania from './AppCabania';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<AppCabania/>);