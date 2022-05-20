import { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

function App() {
  const [posts, setPosts] = useState([]);
  
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
      presence_penalty: 0
    }).then((response) => {
      setPosts((prev) => [{
        heading: `${formDataObj.name}`,
        response: `${response.data.choices[0].text}`
      }, ...prev]);

    }).catch((error) => {
      console.log(error)
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
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post.heading}: {post.response}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
