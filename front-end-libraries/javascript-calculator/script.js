class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nums: [
                {
                    num: 9,
                    class: "",
                },
                {
                    num: 8,
                    class: "",
                },
                {
                    num: 7,
                    class: "",
                },
                {
                    num: 6,
                    class: "",
                },
                {
                    num: 5,
                    class: "",
                },
                {
                    num: 4,
                    class: "",
                },
                {
                    num: 3,
                    class: "",
                },
                {
                    num: 2,
                    class: "",
                },
                {
                    num: 1,
                    class: "",
                },
                {
                    num: 0,
                    class: "wide",
                },
                {
                    num: ".",
                    class: "",
                },
            ],
            modifiers: ["AC"],
            operators: ["/", "*", "-", "+", "="],
        };
    }

    render() {
        return (
            <div id="calculator">
                <p id="display">0123</p>
                <div className="digits flex">
                    {this.state.nums.map((num) => (
                        <Button text={num.num} classN={num.class} />
                    ))}
                    {/* <button>9</button>
                    <button>8</button>
                    <button>7</button>
                    <button>6</button>
                    <button>5</button>
                    <button>4</button>
                    <button>3</button>
                    <button>2</button>
                    <button>1</button>
                    <button className="wide">0</button>
                    <button>.</button> */}
                </div>
                <div className="modifiers subgrid">
                    <button>AC</button>
                    {/* <button></button>
                    <button></button> */}
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

// class Display extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }

//     render() {
//         return <div id="display"></div>;
//     }
// }

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { text, classN } = this.props;
        return (<button className={classN}>{text}</button>);
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
