import ActionCable from 'actioncable';

let cable;

export function connect(channel, callbacks) {
  cable = ActionCable.createConsumer('/cable');
  cable.subscriptions.create({ channel: channel }, callbacks);
}

export function disconnect() {
  if (cable) {
    cable.disconnect();
  }
}
