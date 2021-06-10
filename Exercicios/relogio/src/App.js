import React from 'react';
import './App.css';

function DataFormatada(props) {
  return <h2>Horário Atual: {props.date.
    toLocaleTimeString()}</h2>
}

function Pausar() {
  clearInterval(this.timerID);
}

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date : new Date()
    }
  }

  componentDidMount(){
    this.timerID = setInterval( () => {
      this.thick()
    }, 1000 );

    console.log ("Eu sou o Relógio " + this.timerID)
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  thick(){
    this.setState({
      date : new Date()
    });
  }

  pausar() {
    console.log("Relógio " + this.timerID + " foi pausado")
    clearInterval(this.timerID);
  }

  retomar() {
    this.timerID = setInterval( () => {
      this.thick()
    }, 200 );
    
    console.log("Relógio foi retomado")
    console.log("Agora sou o relógio " + this.timerID)
  }

  render(){
    return (
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date}/>
        <div className="btns">
          <buttton className="btn pausa" onClick={() => this.pausar()}>Pausar</buttton>
          <div className="espaco"></div>
          <buttton className="btn retomada" onClick={() => this.retomar()}>Retomar</buttton>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock/>
        <Clock/>
      </header>
    </div>
  );
}

export default App;
