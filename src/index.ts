require('dotenv').config()

// Run a Streamr node right inside your JS app
const StreamrClient = require('@streamr/sdk');
const OpenAI = require('openai');

const streamr = new StreamrClient();
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Subscribe to a stream of messages
streamr.subscribe("streams.dimo.eth/firehose/weather", async (msg: any) => {
  let parseCount = 1;

  // Handle incoming messages
  console.log(`Incoming msg: ${JSON.stringify(msg)}`);

  if (parseCount < 5) {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: `Extract the position from the json input ${JSON.stringify(msg)} and output in json object` }],
      model: 'gpt-4o',
    });

    console.log(`Parsed msg: ${chatCompletion.choices[0].message.content}`);

    parseCount += 1;
  }
});
