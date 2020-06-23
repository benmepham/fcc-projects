const SOUNDS = [
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
];


class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { display: "Drum Machine" }
    }

    setDisplay = (text) => this.setState({display: text});

    render() {
        return (
            <div id="display">
                <h1>{this.state.display}</h1>
                {SOUNDS.map((sound) => (<DrumPad id={sound.id} text={sound.key} audio={sound.mp3} setDisplay={this.setDisplay} />
                ))}
            </div>
        )}}

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: false}
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);        
    }

    handleKeyPress = ({key}) => {
        if (key.toUpperCase() == this.props.text) {
            this.handleAudio()
            this.setState(() => ({active:true}))
        }
        //key.toUpperCase() == this.props.text ? this.handleAudio() && this.setState(() => ({active:true})) : null

    }
    handleAudio = () => {
        const {id, text, setDisplay} = this.props;
        setDisplay(id);
        const audio = document.getElementById(text)
        if (audio) {
            audio.currentTime = 0
            //const parent = audio.parentNode;
            //parent.classList.add('active')
            audio.play();
        }
    }

    render() {
        const {id, text, audio} = this.props;
        const {active} = this.state;
        return (
            <div className="drum-pad btn btn-danger" onClick={this.handleAudio} id={id}>
                {/* className={active ? ' drum-pad active' : 'drum-pad '} */}
                {text}
                <audio src={audio} className="clip" id={text} />
            </div>
        )
    }
}


// class DrumPad extends React.Component {
//     constructor(props) {
//         super(props);
//         this.audio = React.createRef();
//     }

//     componentDidMount() {
//         this.audio.current.addEventListener('ended', (e) => {
//             const parent = e.target.parentNode;
//             parent.classList.remove('active');
//         });
//     }

//     playSound = () => {
//         this.audio.current.play()
//         const id = this.audio.current.id;

//         const parent = this.audio.current.parentNode;

//         parent.classList.add('active')

//         const display = parent.parentNode;
//         display.querySelector('h1').innerText = `${id} is playing`;
//     }


//     render() {
//         const { text, audio } = this.props;

//         return (
//             <div className="drum-pad btn btn-danger" onClick={this.playSound} id={`drum-${text}`}>
//                 {text}
//                 <audio ref={this.audio} src={audio} className="clip" id={text} />
//             </div>

//         )
//     }
// }

// document.addEventListener('keydown', (e) => {
//     const id = e.key.toUpperCase();
//     const audio = document.getElementById(id);

//     if (audio) {
//         audio.currentTime = 0
//         const parent = audio.parentNode;
//         parent.classList.add('active')
//         const display = parent.parentNode;
//         display.querySelector('h1').innerText = `${id} is playing`;
//         audio.play();
//     }
// });

ReactDOM.render(<App />, document.getElementById('drum-machine'));