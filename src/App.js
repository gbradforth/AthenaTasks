import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <body>
        <h1>AthenaTasks</h1>

        <div class="row">
            <div id = "tasks">
                <h2>Task List</h2> 
                <input type="checkbox"/>
                <label> Clean room</label> <br/>
                <input type="checkbox"/>
                <label> Kill man</label> <br/>
            </div>

            <div id = "calendar">
                <h2>Calendar</h2>
            </div>

            <div id="character">
            <img src={require('./character.jpg')} width="350" height="350"/>
            </div>
        </div>
      </body>     
  );
}

export default App;
