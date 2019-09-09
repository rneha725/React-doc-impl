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
    this.state = { status: true, text: { true: "ON", false: "OFF" } };
  }

  toggle(e) {
    this.setState(state => ({ status: !state.status }));
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle.bind(this)}>
          {this.state.text[this.state.status]}
        </button>
        <hr />
      </div>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("toggle"));

//------------------------------------------------------------------------------
// JS experiment
let ar = [1, 2, 3];
ar = ar.map(i => 2 * i);

console.log(ar);
// in react element, each element in array is rendered

class ListItem extends React.Component {
  render() {
    return (
      <ul>
        {ar.map(i => {
          return <li key={i}>{2 * i}</li>;
        })}
        <hr />
      </ul>
    );
  }
}

ReactDOM.render(<ListItem />, document.getElementById("list"));

//------------------------------------------------------------------------------
// create a form, controlled by state

class FormControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(e) {
    // 1. in case of state not used, below two lines are used
    // let name = document.getElementById("name").value;
    // alert("Hello " + name + "!");
    // 2. when using states
    alert("Hello " + this.state.name + "!");
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value.toUpperCase() });
  }
  render() {
    return (
      <form>
        <input
          type="input"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

ReactDOM.render(<FormControl />, document.getElementById("form"));
