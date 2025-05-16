const amqp = require("amqplib");

const {
  EXCHANGE_NAME,
  MESSAGE_BROKER_URL,
  REMINDER_BINDING_KEY,
} = require("../Config/ServerConfig");


class RabbitMqService {


  async createChannel() {
    try {

      console.log("Connecting to RabbitMQ at:", MESSAGE_BROKER_URL);
      const connection = await amqp.connect(MESSAGE_BROKER_URL);
      const channel = await connection.createChannel();

      await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
      return channel;

    } catch (error) {
      console.log('error => ', error);
      
    }
  };


  async subscribeMessage(channel, service, binding_key) {
    try {
      const applicationQueue = await channel.assertQueue('REMINDER_EMAIL_QUEUE')

      channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

      channel.consume(applicationQueue.queue, (msg) => {
        // console.log("In subscribeMessage function ");
        // console.log("Received data =>", msg.content.toString());

        const payload = JSON.parse(msg.content.toString());
        service(payload);

        channel.ack(msg);
      });
    } catch (error) {
      throw error;
    }
  };


  async publishMessage(channel, binding_key, message) {
    try {
      const queueResult = await channel.assertQueue("REMINDER_EMAIL_QUEUE", {durable: true});

      const publishResult = await channel.publish(
        EXCHANGE_NAME,
        binding_key,
        Buffer.from(message),
         
      );

      // Ensure queue binding
      await channel.bindQueue(queueResult.queue, EXCHANGE_NAME, binding_key);

      return {
        success: publishResult,
        queueName: queueResult.queue,
        messageSize: message.length
      };
    } catch (error) {
      throw error;
    }
  };





  async sendMessageToQueueService(data) {
    try {
      const channel = await this.createChannel();

      const payload = {
        data: {
          ...data,

        },
        service: "CREATE_TICKET_PAYMENT",
      };

      // console.log("Sending data to publish ", payload);

      const res = await this.publishMessage(
        channel,
        REMINDER_BINDING_KEY,
        JSON.stringify(payload)
      );

      console.log('Message published successfully:', res);
      await channel.close();
      return res;


    } catch (error) {
      console.log(
        "Something went wrong in service layer (publish Message to Queue)"
      );
      throw error;
    }
  }
}

const rabbitMqService = new RabbitMqService();

module.exports = rabbitMqService;
