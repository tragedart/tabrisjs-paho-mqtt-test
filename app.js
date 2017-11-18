require('tabris');
require('paho-mqtt');

// Create a client instance
let client = new Paho.MQTT.Client('iot.eclipse.org', 80, '/ws', "a_client_Id");

// set callback handler
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log('client connected!');
  client.subscribe('the_topic');

  // Create a message instance
  let message = new Paho.MQTT.Message('hello!');
    message.destinationName = 'the_topic';

  // test app over! publishing
  setInterval(() => {
    client.send(message);
  }, 1000);
}

// called when a message arrives
function onMessageArrived(message) {
 console.log('from the_topic: ' + message.payloadString);
}