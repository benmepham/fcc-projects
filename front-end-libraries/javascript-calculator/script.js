class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="calculator">
                <h1 id="display">Disp</h1>
                <div className="digits flex">
                    <button>9</button>
                    <button>8</button>
                    <button>7</button>
                    <button>6</button>
                    <button>5</button>
                    <button>4</button>
                    <button>3</button>
                    <button>2</button>
                    <button>1</button>
                    <button className="wide">0</button>
                    <button>.</button>
                </div>
                <div className="modifiers subgrid">
                    <button>AC</button>
                    <button>AC</button>
                    <button>AC</button>
                </div>
                <div className="operations subgrid">
                    <button>/</button>
                    <button>*</button>
                    <button>-</button>
                    <button>+</button>
                    <button>=</button>
                </div>
            </div>
        );
    }
}

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div id="display"></div>;
    }
}

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div id="calculator">Calc</div>;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
