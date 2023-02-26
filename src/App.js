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
                <label> Clean room</label> <br/>
                <input type="checkbox"/>
                <label> Kill man</label> <br/>
            </div>

            <div id = "calendar">
                <h2>Calendar</h2>
            </div>

            <div id="character">
                
            </div>
        </div>
      </body>     
  );
}

export default App;
