import React from 'react'
  
const Progress_bar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        margin: 0
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:10,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 0,
        color:"RebeccaPurple",
        fontWeight: 900,
        position:'relative',
        top:'12px'
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}

export default Progress_bar;