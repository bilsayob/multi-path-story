import React from 'react';
import { connect } from 'react-redux'
import { savePath, selectPath, goBackToRootPath, goBackToPreviousPath, goToPath } from './actions'
import { getCurrentSentence, getPathSentence, canGoBack, getHistory } from './selectors'
import Path from './components/path'

import './normalize.css';
import './App.css';

class App extends React.Component {
  onSavePath (index, sentence) {
    this.props.savePath(index, sentence)
  }
  onSelectPath (index) {
    this.props.selectPath(index)
  } 
  goToPath(key) {
    this.props.goToPath(key)
  }
  render () {
    return (
      <div id="app">
        <div className="container"> 
          <div className="panel">
            {
              !this.props.sentence
                ? <h1>Add an initial sentence</h1>
                : <div id="path-navigation-buttons" className="button-group">
                  <button disabled={!this.props.canGoBack} onClick={this.props.goBackToRootPath}>Back to root</button>
                  <button disabled={!this.props.canGoBack} onClick={this.props.goBackToPreviousPath}>Back</button>
                </div>
            }
            {
              this.props.sentence
              ? <h2>Current</h2>
              : null
            }
            {
              <Path
                sentence={this.props.sentence}
                onSave={this.onSavePath.bind(this, null)}
              />
            }
            {
              this.props.sentence
                ? (
                  <div>
                    <h2>Paths</h2>
                    {
                      this.props.sentences.map((sentence, index) => {
                        return (
                          <Path
                            onSave={this.onSavePath.bind(this, index + 1)}
                            onSelect={this.onSelectPath.bind(this, index + 1)}
                            sentence={sentence}
                            index={index + 1}
                            key={index} />
                        )
                      })
                    }
                  </div>
                )
                : null
            }
          </div>
          { 
            this.props.sentence
              ? (
                <div id="history">
                  <h2>Story</h2>
                  { this.props.history.map(path => {
                    return (
                      <div className="historyItem" onClick={this.goToPath.bind(this, path.key)} key={path.key}>{path.sentence}</div>
                    )
                  })}
                </div>
              ) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  canGoBack: canGoBack(state),
  sentence: getCurrentSentence(state),
  sentences: [1, 2, 3, 4].map(i => {
    return getPathSentence(state, i)
  }),
  history: getHistory(state)
})

const mapDispatchToProps = dispatch => ({
  goToPath: (key) => dispatch(goToPath(key)),
  goBackToRootPath: () => dispatch(goBackToRootPath()),
  goBackToPreviousPath: () => dispatch(goBackToPreviousPath()),
  savePath: (index, sentence) => dispatch(savePath(index, sentence)),
  selectPath: (index) => dispatch(selectPath(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)


