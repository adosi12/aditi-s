exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    };
  }

  const prompt = parsedBody.prompt || '';

  const geminiPayload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.AIzaSyCRlu5BeCMTyRAqWCPs30WPA1V387hby6k}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    }
  );

  const rawText = await res.text();

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Gemini returned invalid JSON: ' + rawText.slice(0, 200) }),
    };
  }

  if (!res.ok) {
    return {
      statusCode: res.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: data.error?.message || 'Gemini API error' }),
    };
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ text }),
  };
};