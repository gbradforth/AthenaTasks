import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [level, setLevel] = useState(1);

  const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      },
    ]);
    setInput("");
  };
  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id == id) {
        if (!task.complete){
            //Task is pending, modifying it to complete and increment the count
            setCompletedTaskCount(completedTaskCount + 1);
            if((completedTaskCount%5)==0){
              setLevel(level + 1);
            }
        } 
        else {
            //Task is complete, modifying it back to pending, decrement Complete count
            setCompletedTaskCount(completedTaskCount - 1);
            // setLevel(level - 1);
        }
      item = { ...task, complete: !task.complete };
      } 
      else item = { ...task };
      return item;
    });
    setTodoList(list);
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
      <body>
        <h1><a href='index.html'>AthenaTasks</a></h1>
        <div id="login">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
        <div class="row">
        <div id = "tasks">
                <h2>Task List</h2> 
                <Tasks>
                  <TaskCount>
                    <b>Pending Tasks</b> {todoList.length - completedTaskCount}
                  </TaskCount>
                  <TaskCount>
                    <b>Completed Tasks</b> {completedTaskCount}
                  </TaskCount>
                </Tasks>
              <div>
                <ul>
                  {todoList.map((todo) => {
                    return (
                      <LIST
                        complete = {todo.complete}
                        id={todo.id}
                        onClick={() => handleComplete(todo.id)}
                        style={{
                          listStyle: "none",
                          textDecoration: todo.complete && "line-through",
                        }}
                      >
                        {todo.task}
                      </LIST>
                    );
                  })}
                </ul>
              </div>
              <Text value={input} onInput={(e) =>setInput(e.target.value)} />
              <Button onClick={() => handleClick()}>Add</Button>
                <Tasks>
                  <TaskCount>
                    <b>Pending Tasks</b> {todoList.length - completedTaskCount}
                  </TaskCount>
                  <TaskCount>
                    <b>Completed Tasks</b> {completedTaskCount}
                  </TaskCount>
                </Tasks>
              <div>
                <ul>
                  {todoList.map((todo) => {
                    return (
                      <LIST
                        complete = {todo.complete}
                        id={todo.id}
                        onClick={() => handleComplete(todo.id)}
                        style={{
                          listStyle: "none",
                          textDecoration: todo.complete && "line-through",
                        }}
                      >
                        {todo.task}
                      </LIST>
                    );
                  })}
                </ul>
              </div>
              <Text value={input} onInput={(e) =>setInput(e.target.value)} />
              <Button onClick={() => handleClick()}>Add</Button>
            </div>
            <div id="calendar">
                <h2>Calendar</h2>
                <Calendar/>
            </div>

            <div id="character">
              <div class = "exp bar">
                <header>Your EXP</header>
                <section class="progress">
                  <h2>Level <span level ></span> {level} </h2>
                    {/* <input type={input} /> */}
                    <div class="exp-bar">
                      <span><span></span></span>
                    </div>
                </section>
              </div>
            </div>
        </div>
      </body>     
  );
}

export default App;
