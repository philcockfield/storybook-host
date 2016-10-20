import { configure } from '@kadira/storybook'


// Global CSS.
// import '../assets/css/normalize.css'


// Load stories.
const req = require.context('../lib', true, /.stories.js$/);
configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
