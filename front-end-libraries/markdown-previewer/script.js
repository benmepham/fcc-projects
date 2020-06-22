const PLACEHOLDER =
    `# Welcome to my Markdown Previewer

## Built with React

By [Ben](https://bjm.me.uk)

\`<p>Hello</p>\`

\`\`\`
let x = 1;
\`\`\`

- List item 1
- List item 2

> Do as I say, not as I do

**Bold text**

![React Logo](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K)
`


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: PLACEHOLDER }
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1 className="text-center m-4">Markdown Previewer</h1>
                <div className="row mb-4">
                    <div className="col-6 d-flex flex-column">
                        <h5 className="text-center">Editor</h5>
                        <textarea id="editor" className="form-control p-2 flex-grow-1" value={this.state.text} onChange={this.handleChange} />
                    </div>
                    <div className="col-6">
                        <h5 className="text-center">Preview</h5>
                        <div id="preview" className="preview rounded p-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(this.state.text, { gfm: true, breaks: true })) }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));