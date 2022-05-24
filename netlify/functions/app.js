const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const response = await axios.get(`${process.env.OPENAI_API_KEY}`);

    console.log("response", response)
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ title: response.data.title }),
    // };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
}