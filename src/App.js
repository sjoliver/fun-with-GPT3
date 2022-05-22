import { React, useState } from 'react';
import './App.css';

const { Configuration, OpenAIApi } = require("openai");

function App() {
  const [name, setName] = useState('');
  const [posts, setPosts] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => { 
    event.preventDefault();
    setSubmitting(true);
    setName('');

    // construct set of key/val pairs from text field
    const formData = new FormData(event.target)

    // Object.fromEntries() converts form data into object using the key/vals from formData
    const formDataObj = Object.fromEntries(formData.entries())

    const configuration = new Configuration({
      apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`
    });

    const openai = new OpenAIApi(configuration);

    openai.createCompletion("text-curie-001", {
      prompt: `Suggest a funny DJ name 
        name: Sonia
        dj: DJ Slimy Spin Sonia
        name: Fifi
        dj: DJ Funky Fresh Fifi
        name: Graeme
        dj: Grizzly Graeme
        name: ${formDataObj.name}
        dj:`,
      temperature: 0.8,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }).then((response) => {
      setSubmitting(false);

      // add new posts to the beginning of the state area so that posts will be displayed newest to oldest
      setPosts((prev) => [{
        name: `${formDataObj.name}`,
        dj: `${response.data.choices[0].text}`
      }, ...prev]);

    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <br/>
      <h1 id='header'>DJ Name Generator</h1>
      <p>Generate DJ names for you and your friends below.</p>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            className="name-input"
            name="name" 
            value={name}
            autoFocus="autofocus"
            placeholder="Enter a keyword like your name"
            onChange={event => setName(event.target.value)} 
          />
        </label>
        <button className="submit-btn" type="submit">Generate</button>
      </form>
      <br/>
      {submitting &&
       <p className="submitting">Generating a fly DJ name...</p>
      }
      <div className="posts">
        {posts.map((post, index) => {
          return (
            <div key={index} className='single-post'>
              <p>Presenting <b>{post.name}</b> as... </p>
              <p className="dj-name"><b>{post.dj}</b></p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
