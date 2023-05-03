// react-frontend/src/cable.js
import { createConsumer } from '@rails/actioncable';
const URL = 'ws://localhost:3001/cable';
const consumer = createConsumer(URL);
 
export default consumer;