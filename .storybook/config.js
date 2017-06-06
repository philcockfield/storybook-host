
import { configure } from '@storybook/react';


// Load stories.
const req = require.context('../lib', true, /.stories.js$/);
configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
