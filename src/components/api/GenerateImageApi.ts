import axios from 'axios';

const GenerateImageApi = async (prompt: string, color: boolean): Promise<string> => {

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/images/generations';

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const data = {
    // prompt: `${prompt} without background, thin lined architect sketch, ${color ? 'colorful' : 'black and white'}`,
    prompt: `${prompt} A traditional mandala design with a focus on spiritual and geometric harmony. ${color ? 'colorful poster' : 'black and white'}`,
    // prompt: `A professional tattoo design that looks like "${prompt}". No letter. ${color ? 'colored' : 'black and white'}`,÷
    n: 1,
    size: '512x512',
    response_format: 'url',
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};



export default GenerateImageApi; 