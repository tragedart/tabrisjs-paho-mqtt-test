require('tabris');
require('paho-mqtt');

// Create a client instance
let client = new Paho.MQTT.Client('iot.eclipse.org', 80, '/ws', "theclientId");

// set callback handler
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make subscriptions and send messages.
  console.log('client connected!');
  client.subscribe('/thetopic1');
  client.subscribe('/thetopic2');

  // Create message instances
  let message1 = new Paho.MQTT.Message('Hello!');
    message1.destinationName = '/thetopic1';
  let message2 = new Paho.MQTT.Message('Bye!');
    message2.destinationName = '/thetopic2';

  // test app over! publishing
  setInterval(() => {
    client.send(message1);
    client.send(message2);
    // or client.send('/topic', 'message'); without creating message instance
  }, 1000);
}

// called when a message arrives
function onMessageArrived(message) {
  console.log('from:', message.destinationName, message.payloadString);
}