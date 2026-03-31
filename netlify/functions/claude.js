
exports.handler = async (event, context) => {
  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'CLAUDE_API_KEY environment variable not set.' }),
    };
  }

  // TODO: Add your logic here to use the apiKey to interact with the Claude API.
  // For example, you might make a fetch request to the Claude API.

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Successfully called claude function.' }),
  };
};
