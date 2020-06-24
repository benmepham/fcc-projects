class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "Drum Machine",
            sounds: [
                {
                    key: 'Q',
                    id: 'Chord-1',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
                },
                {
                    key: 'W',
                    id: 'Chord-2',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
                },
                {
                    key: 'E',
                    id: 'Chord-3',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
                },
                {
                    key: 'A',
                    id: 'Shaker',

                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
                },
                {
                    key: 'S',
                    id: 'Open-HH',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
                },
                {
                    key: 'D',
                    id: 'Closed-HH',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
                },
                {
                    key: 'Z',
                    id: 'Punchy-Kick',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
                },
                {
                    key: 'X',
                    id: 'Side-Stick',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
                },
                {
                    key: 'C',
                    id: 'Snare',
                    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
                }
            ]
        }

        this.setDisplay = this.setDisplay.bind(this)

    };

    setDisplay = (text) => this.setState({ display: text });

    render() {
        return (
            <div id="display">
                <h1>{this.state.display}</h1>
                {this.state.sounds.map((sound) => (<DrumPad id={sound.id} text={sound.key} audio={sound.mp3} setDisplay={this.setDisplay} />))}
            </div>
        )
    }
}

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
    }

    componentDidMount() {
        document.addEventListener('keydown', ({ key }) => key.toUpperCase() === this.props.text ? this.handleAudio() : null)
    }

    handleAudio = () => {
        const { id, text, setDisplay } = this.props, audio = document.getElementById(text);
        setDisplay(id);
        if (audio) {
            audio.currentTime = 0
            this.setState(() => ({ active: true }))
            audio.play();
            setTimeout(() => {
                this.setState(() => ({
                    active: false
                }))
            }, 150)

        }
    }

    render() {
        const { id, text, audio } = this.props;
        return (
            <div className={this.state.active ? ' drum-pad active' : 'drum-pad'} onClick={this.handleAudio} id={id}>
                {text}
                <audio src={audio} className="clip" id={text} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('drum-machine'));