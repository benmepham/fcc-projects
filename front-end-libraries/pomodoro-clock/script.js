const sound = document.getElementById("beep");

function Timers(props) {
    const type = props.title.toLowerCase();

    return (
        <div id={`${type}`}>
            <h2 id={`${type}-label`}>{props.title} Length</h2>
            <div className="flex">
                <button id={`${type}-decrement`} onClick={props.handleDecrease}>
                    <i className="fas fa-minus" />
                </button>
                <p id={`${type}-length`}>{props.count}</p>
                <button id={`${type}-increment`} onClick={props.handleIncrease}>
                    <i className="fas fa-plus" />
                </button>
            </div>
        </div>
    );
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            isRunning: false,
            currentTimer: "Session",
            clockSeconds: 25 * 60,
        };
        this.loop = undefined;
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    handlePlayPause = () => {
        if (this.state.isRunning) {
            clearInterval(this.loop);
            this.setState({
                isRunning: false,
            });
        } else {
            this.setState({
                isRunning: true,
            });
            this.loop = setInterval(() => {
                const { clockSeconds } = this.state;

                if (clockSeconds === 0) {
                    this.setState({
                        currentTimer:
                            this.state.currentTimer === "Session"
                                ? "Break"
                                : "Session",
                        clockSeconds:
                            this.state.currentTimer === "Session"
                                ? this.state.breakLength * 60
                                : this.state.sessionLength * 60,
                    });
                    sound.play();
                } else {
                    this.setState({
                        clockSeconds: clockSeconds - 1,
                    });
                }
            }, 1000);
        }
    };

    handleReset = () => {
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            isRunning: false,
            currentTimer: "Session",
            clockSeconds: 25 * 60,
        });

        clearInterval(this.loop);
        sound.pause();
        sound.currentTime = 0;
    };

    handleLengthChange = (length, timerType) => {
        let newCount;

        if (timerType === "break") {
            newCount = this.state.breakLength + length;
        } else {
            newCount = this.state.sessionLength + length;
        }

        if (newCount > 0 && newCount < 61 && !this.state.isRunning) {
            this.setState({
                [`${timerType}Length`]: newCount,
            });

            if (this.state.currentTimer.toLowerCase() === timerType) {
                this.setState({
                    clockSeconds: newCount * 60,
                });
            }
        }
    };

    convertToTime = (value) => {
        let mins = Math.floor(value / 60);
        let secs = value % 60;
        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        return `${mins}:${secs}`;
    };

    render() {
        const breakProps = {
            title: "Break",
            count: this.state.breakLength,
            handleDecrease: () => this.handleLengthChange(-1, "break"),
            handleIncrease: () => this.handleLengthChange(1, "break"),
        };

        const sessionProps = {
            title: "Session",
            count: this.state.sessionLength,
            handleDecrease: () => this.handleLengthChange(-1, "session"),
            handleIncrease: () => this.handleLengthChange(1, "session"),
        };
        return (
            <div id="clock">
                {/* <h1>Pomodoro Clock</h1> */}
                <Timers {...breakProps} />
                <Timers {...sessionProps} />
                <div id="timer">
                    <h2 id="timer-label">{this.state.currentTimer}</h2>
                    <p id="time-left">
                        {this.convertToTime(this.state.clockSeconds)}
                    </p>
                    <button id="start_stop" onClick={this.handlePlayPause}>
                        <i
                            className={`fas fa-${
                                this.state.isRunning ? "pause" : "play"
                            }`}
                        />
                    </button>
                    <button id="reset" onClick={this.handleReset}>
                        <i className="fas fa-sync" />
                    </button>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("app"));
