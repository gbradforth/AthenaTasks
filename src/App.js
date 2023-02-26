import './App.css';
import styled from 'styled-components';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, {useState, useEffect} from 'react';
import Calendar from './Calendar';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Button = styled.button`
  display:inline-block;
  flex: 1;
  border: none;
  background-color: #854C70;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
`;
const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
`;
const TaskCount = styled.span`
  margin: 10px;
`;
const Tasks = styled.div`
`;
const LIST = styled.li`
    listStyle:"none";
    text-decoration: "line-through";
`;

function App() {
  //vars for todo list
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [level, setLevel] = useState(1);
  
  //vars for login
  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState(null);

  //login/logout functions
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error)
  // });
  // useEffect(() => {
  //   if(user){
  //     axios({
  //       url: "https://www.googleapis.com/oauth2/v/userinfo?access_token=${user.access_token}",
  //       headers: {
  //         'Access-Control-Allow-Origin': 'http://localhost:300',
  //         'Access-Control-Allow-Credentials': true
  //       }
  //     })
  //     .then((res) => {
  //       setProfile(res.data);
  //     })
  //     .catch((err) => console.log(err));
  //   }
  // }, [user]);
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

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

  return (
      <body>
        <h1><a href='index.html'>AthenaTasks</a></h1>
        <div id="login">
        </div>
        <div className="row">
        <div id = "tasks">
                <h2 className="category-heading">Task List</h2> 
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
                <h2 className="category-heading">Calendar</h2>
                <Calendar/>
            </div>

            <div id="character">
              <div className = "exp bar">
                <header>Your EXP</header>
                <section className="progress">
                  <h2>Level <span level ></span> {level} </h2>
                    {/* <input type={input} /> */}
                    <div className="exp-bar">
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
