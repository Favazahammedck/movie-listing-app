import { useState } from 'react';
import './App.css';
import { MovieForm } from './components/MovieForm'
import { Search } from './components/Search'

function App() {
  const [search, setSearch] = useState('')

  return (
    <div className="App">
        <Search search={search} setSearch={setSearch}/>

      <MovieForm search={search}/>
    </div>
  );
}

export default App;
