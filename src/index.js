var React = require("react");
var ReactDOM = require("react-dom");

//------------------------------------------------------------------------------
function time() {
  let timeElement = <div>{new Date().toLocaleTimeString()}</div>;
  ReactDOM.render(timeElement, document.getElementById("time"));
}
setInterval(time, 1000);

//------------------------------------------------------------------------------
//component definition
// 1. Using fucntion with an argument, props
// function Welcome(props) {
//   return <div>Hello, {props.name}</div>;
// }
// 2. Using class
class Welcome extends React.Component {
  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}

// component composition
function App(props) {
  return (
    <div>
      <hr />
      <Welcome name="World!" />
      <Welcome name="Neha!" />
      <hr />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("hello"));

//------------------------------------------------------------------------------
//Another clock, with states
// for usign states, class definition is required
class Seconds extends React.Component {
  constructor(props) {
    super(props);
    // Whenever state is changed, component is re-rendered
    this.state = { seconds: new Date().getSeconds() };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      // Do not modify state directly
      this.setState({ seconds: new Date().getSeconds() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
        <hr />
      </div>
    );
  }
}

ReactDOM.render(<Seconds />, document.getElementById("seconds"));

//------------------------------------------------------------------------------
// Events
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 0, text: { "1": "ON", "0": "OFF" } };
  }

  toggle() {
    let st = this.state.status;
    if (st === 0) {
      st = 1;
    } else if (st === 1) {
      st = 0;
    }
    this.setState({ status: st });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>
          {this.state.text[this.state.status]}
        </button>
        <hr />
      </div>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("toggle"));
