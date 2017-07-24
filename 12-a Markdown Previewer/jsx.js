const defaultInput = 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*';
const defaultOutput = marked(defaultInput);

class DisplayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: defaultInput,
      output: defaultOutput
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      output: marked(event.target.value, {
        sanitize: true
      })
    });
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-6'>
          <textarea rows='25' value={this.state.input} onChange={this.handleChange} />
        </div>
        <div className='col-md-6'>
          <span dangerouslySetInnerHTML={ {__html: this.state.output} }></span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <DisplayContainer />,
  document.getElementById('container')
);