const NUMS = [
        {
            num: 9,
            id: "nine",
        },
        {
            num: 8,
            id: "eight",
        },
        {
            num: 7,
            id: "seven",
        },
        {
            num: 6,
            id: "six",
        },
        {
            num: 5,
            id: "five",
        },
        {
            num: 4,
            id: "four",
        },
        {
            num: 3,
            id: "three",
        },
        {
            num: 2,
            id: "two",
        },
        {
            num: 1,

            id: "one",
        },
        {
            num: 0,
            id: "zero",
        },
        {
            num: ".",
            id: "decimal",
        },
    ],
    OPERATORS = [
        {
            op: "/",
            id: "divide",
        },
        {
            op: "*",
            id: "multiply",
        },
        {
            op: "+",
            id: "add",
        },
        {
            op: "-",
            id: "subtract",
        },
        {
            op: "=",
            id: "equals",
        },
    ];

class ResultComponent extends React.Component {
    render() {
        return <div id="display">{this.props.result}</div>;
    }
}

class KeyPadComponent extends React.Component {
    render() {
        return (
            <div className="digits flex">
                {NUMS.map((item) => (
                    <button
                        onClick={(e) => this.props.onClick(item.num)}
                        id={item.id}
                    >
                        {item.num}
                    </button>
                ))}
            </div>
        );
    }
}

class ModifierComponent extends React.Component {
    render() {
        return (
            <div className="modifiers subgrid">
                <button onClick={(e) => this.props.onClick("AC")} id="clear">
                    AC
                </button>
            </div>
        );
    }
}

class OperatorComponent extends React.Component {
    render() {
        return (
            <div className="operators subgrid">
                {OPERATORS.map((item) => (
                    <button
                        onClick={(e) => this.props.onClick(item.op)}
                        id={item.id}
                    >
                        {item.op}
                    </button>
                ))}
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = { result: "0" };
    }

    onClick = (button) => {
        if (button === "=") {
            this.calculate();
        } else if (button === "AC") {
            this.reset();
        } else if (this.state.result.length > 10) {
            this.maxDigits();
        }
        // Prevent mutliple "." in the same part
        else if (button === ".") {
            const last = this.state.result.split(/[\+\-\*\/]/).slice(-1)[0];
            if (!last.includes(".")) {
                this.setState({
                    result: this.state.result + ".",
                });
            }
        }
        // Allow negative operator to come after other operators
        else if (/[\-]/.test(button) && /[\+\*\/]$/.test(this.state.result)) {
            console.log("Minus");
            this.setState({
                result: this.state.result + button,
            });
        }
        // Allow only one operator
        else if (
            /[\+\-\*\/]/.test(button) &&
            /[\+\-\*\/]+$/.test(this.state.result)
        ) {
            this.setState({
                result: this.state.result.replace(/[\+\-\*\/]+$/, "") + button,
            });
        } else {
            this.setState({
                result: this.state.result.replace(/^0+/, "") + button,
            });
        }
    };

    calculate = () => {
        try {
            this.setState({
                result: (eval(this.state.result) || "") + "",
            });
        } catch (e) {
            this.setState({
                result: "error",
            });
        }
    };

    reset = () => {
        this.setState({
            result: "0",
        });
    };

    maxDigits = () => {
        const last = this.state.result;
        this.setState({
            result: "Digit Limit Met",
        });
        setTimeout(() => this.setState({ result: last }), 500);
    };

    render() {
        return (
            <div id="calculator">
                <ResultComponent result={this.state.result} />
                <KeyPadComponent onClick={this.onClick} />
                <ModifierComponent onClick={this.onClick} />
                <OperatorComponent onClick={this.onClick} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
