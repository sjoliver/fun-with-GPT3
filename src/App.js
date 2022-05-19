import { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");


function App() {
  const [prompt, setPrompt] = useState({
    heading: "Response will be shown here",
    response: "... await the response"
  });
  
  const handleSubmit =  (event) => { 
    event.preventDefault();

    // construct set of key/val pairs from text field
    const formData = new FormData(event.target)

    // Object.fromEntries() converts form data into object using the key/vals from formData
    const formDataObj = Object.fromEntries(formData.entries())
    console.log(formDataObj)

    const configuration = new Configuration({
      apiKey: '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',
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

      console.log("response", response.data.choices[0].text)
      // setPrompt({
      //   heading: `AI DJ Name Suggestions for: ${formDataObj.name}`,
      //   response: `${response.data.choices[0].text}`
      // })
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
    </div>
  );
}

export default App;
