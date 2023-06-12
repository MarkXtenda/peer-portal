import ActionCable from 'actioncable';
// let cable;
const cableUrl = 'ws://localhost:3000/cable';
export const cable = ActionCable.createConsumer(cableUrl);

export function connect(channel, callbacks) {
  const cableUrl = 'ws://localhost:3000/cable';
  const cable = ActionCable.createConsumer(cableUrl);
  cable.subscriptions.create({ channel: channel }, callbacks);
}

export function disconnect() {
  if (cable) {
    cable.disconnect();
  }
}
