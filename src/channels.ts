import * as Ably from 'ably';
import { API_KEY } from './config';

const log = console.log;

const channelName = 'pavel-poc';

async function sub() {
  const client = 'subber';
  const ably = new Ably.Realtime.Promise(API_KEY);
  await ably.connection.once('connected');

  log(`Subscribed to channel: ${channelName}`);
  const channel = ably.channels.get(channelName);
  channel.presence.enterClient(client);

  channel.presence.subscribe('enter', function (member) {
    if (member.clientId === client) {
      console.log(`Got new joiner: ${member.clientId}`);
    }
  });

  await channel.subscribe(channelName, (message) => {
    log(`Got message: ${message.data}`);
  });
}

async function pub() {
  const client = 'pubber';
  const ably = new Ably.Realtime.Promise(API_KEY);
  await ably.connection.once('connected');
  const channel = ably.channels.get(channelName);
  channel.presence.enterClient(client); // => Bob entered realtime-chat
  log(`Published to channel: ${channelName}`);
  await channel.publish(channelName, 'hello!');
}

(async function () {
  await sub();
  await pub();
})();
