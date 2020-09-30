import React from 'react';

class Path extends React.Component {
    constructor(props) {
        super ();
        this.state = {
            sentence: props.sentence
        }
    }
    save () {
        this.props.onSave(this.state.sentence)
    }
    select () {
        if (this.props.onSelect) {
            this.props.onSelect()
        }
    }
    onSentenceChange(event) {
        this.setState({
            sentence: event.target.value
        });
    }
    isDisabled () {
        return !this.state.sentence || (this.props.sentence === this.state.sentence)
    }
    render() {
        return (
            <div className="path" key={this.props.sentence}> 
                <input type="textarea" onChange={this.onSentenceChange.bind(this)} defaultValue={this.props.sentence}/>
                <div className="button-group">
                    <button disabled={ this.isDisabled() } onClick={this.save.bind(this)}>Save</button>
                    {this.props.sentence && this.props.index ? <button onClick={this.select.bind(this)}>{'>>'}</button> : null}
                </div>
            </div>
        )
    }
}

export default Path