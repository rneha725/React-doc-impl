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
// input, textarea and select use value to interact with state in React components

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
        <hr />
      </form>
    );
  }
}

ReactDOM.render(<FormControl />, document.getElementById("form"));

//------------------------------------------------------------------------------
// Lifting uo states: to nearst ancestor
class WaterBoil extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: { c: "", f: "" } };
    this.handleCChange = this.handleCChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.clear = this.clear.bind(this);
  }
  convertCToF(val) {
    return +val + 5;
  }

  convertFToC(val) {
    return val - 5;
  }
  handleCChange(e) {
    console.log(e.target.value);
    console.log("initial state" + this.state.temperature.f);
    this.setState({
      temperature: {
        c: e.target.value,
        f: +e.target.value + 5
      }
    });
    console.log("State" + this.state.temperature.f);
  }

  handleFChange(e) {
    this.setState({
      temperature: { c: this.convertFToC(e.target.value), f: e.target.value }
    });
  }

  clear() {
    this.setState({
      temperature: { c: "", f: "" }
    });
  }

  render() {
    return (
      <fieldset>
        <TemperatureInput
          scale="Celcius"
          value={this.state.temperature.c}
          handleChange={this.handleCChange}
        />
        <TemperatureInput
          scale="Farenheit"
          value={this.state.temperature.f}
          handleChange={this.handleFChange}
        />
        <Result value={this.state.temperature.c} />
        <button onClick={this.clear}>Clear Inputs</button>
      </fieldset>
    );
  }
}

class TemperatureInput extends React.Component {
  render() {
    console.log(this.props.handleChange);
    return (
      <fieldset>
        <label>{this.props.scale}: </label>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.handleChange}
        />
      </fieldset>
    );
  }
}

class Result extends React.Component {
  render() {
    if (this.props.value > 100) {
      return <div>Water will boil.</div>;
    } else {
      return <div>Water will not boild.</div>;
    }
  }
}

ReactDOM.render(<WaterBoil />, document.getElementById("root"));
