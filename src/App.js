import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <body>
        <h1><a href='index.html'>AthenaTasks</a></h1>
        <div class="row">
            <div id = "tasks">
                <h2>Task List</h2> 
                <input type="checkbox"/>
                <label for="vehicle1"> Clean room</label>
            </div>

            <div id = "calendar">
                <h2>Calendar</h2>
            </div>

            <div id="character">
                <h2>Character</h2>
            </div>
        </div>
      </body>     
  );
}

export default App;
