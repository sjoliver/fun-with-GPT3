import { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

function App() {
  const [post, setPost] = useState({
    heading: "Response will be shown here",
    response: "... await the response"
  });
  
  const handleSubmit = (event) => { 
    event.preventDefault();

    // construct set of key/val pairs from text field
    const formData = new FormData(event.target)

    // Object.fromEntries() converts form data into object using the key/vals from formData
    const formDataObj = Object.fromEntries(formData.entries())

    const configuration = new Configuration({
      apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`
    });
    const openai = new OpenAIApi(configuration);

    openai.createCompletion("text-curie-001", {
      prompt: `Write a funny DJ name for ${formDataObj.name}`,
      temperature: 0.8,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }).then((response) => {
      setPost({
        heading: `AI DJ Name Suggestions for: ${formDataObj.name}`,
        response: `${response.data.choices[0].text}`
      })
    }).catch((error) => {
      console.log("ERROR", error)
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label> Who would you like to generate a DJ name for?
          <input 
            type="text" 
            name="name"
            placeholder='Enter your name here'
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h1>{post.heading}</h1>
      <h4>{post.response}</h4>
    </div>
  );
}

export default App;
