import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
class Word extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: props.word,
            length: length(word),
            num_correct: 0
        };
    }
}
*/

function LetterButton(props) {
    return (
        <button className="LetterButton" onClick={props.onClick}>
            {props.letter}
        </button>
    );
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyboard: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            parentClick: this.props.parentClick
        };
    }

    handleClick(i) {
        if (this.state.keyboard[i] !== '~') {
            const key = this.state.keyboard;
            const temp = key[i];
            key[i] = '~';
            this.props.parentClick(temp);
            this.setState({
                keyboard: key
            });
        }
    }

    render() {
        const row1 = [];
        const row2 = [];
        const row3 = [];

        for (let i = 0; i < 9; ++i) {
            row1.push(<LetterButton letter={this.state.keyboard[i]}
                                    onClick={() => this.handleClick(i)} />);
        }
        for (let i = 9; i < 18; ++i) {
            row2.push(<LetterButton letter={this.state.keyboard[i]}
                                    onClick={() => this.handleClick(i)} />);
        }
        for (let i = 18; i < 25; ++i) {
            row3.push(<LetterButton letter={this.state.keyboard[i]}
                                    onClick={() => this.handleClick(i)} />);
        }

        return (
            <div>
                <div className="KeyboardRow">
                    {row1}
                </div>
                <div className="KeyboardRow">
                    {row2}
                </div>
                <div className="KeyboardRow">
                    {row3}
                </div>
            </div>
        );
    }
}

function Word(props) {
    return(
        <div className="WordArr">{props.word_arr}</div>
    )
}

class Man extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: this.props.progress,
        };
    }

    renderHead() {
        if (this.props.progress >= 1) {
            return (<div class="circle"></div>);
        }
        else {
            return null;
        }
    }

    renderBody() {

        if (this.props.progress >= 2) {
            return (<div class="body"></div>);
        }
        else {
            return null;
        }
    }

    renderLeftArm() {
        if (this.props.progress >= 3) {
            return (<div class="leftArm"></div>);
        }
        else {
            return null;
        }
    }
    
    renderRightArm() {
        if (this.props.progress >= 4) {
            return (<div class="rightArm"></div>);
        }
        else {
            return null;
        }
    }

    renderLeftLeg() {
        if (this.props.progress >= 5) {
            return (<div class="leftLeg"></div>);
        }
        else {
            return null;
        }
    }

    renderRightLeg() {
        if (this.props.progress >= 6) {
            return (<div class="rightLeg"></div>);
        }
        else {
            return null;
        }
    }

    render() {
        return(
            <div>
            <div>{this.renderHead()}</div>
            <div>{this.renderBody()}</div>
            <div>{this.renderLeftArm()}</div>
            <div>{this.renderRightArm()}</div>
            <div>{this.renderLeftLeg()}</div>
            <div>{this.renderRightLeg()}</div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "APPLE",
            word_arr: Array(5).fill('_'),
            num_correct: 0,
            num_incorrect: 0
        }
    }

    handleKeyboardClick(i) {
        const word_temp = this.state.word;
        const word = word_temp.toUpperCase();
        const temp = i;
        if (word.includes(temp)) {
            //alert("Correct");
            const regEx = new RegExp(temp, "g");
            const count = (word.match(regEx) || []).length;
            this.setState((state) => ({
                num_correct: state.num_correct + count,
            }));
            const indices = findAll(word, temp);
            const word_arr = this.state.word_arr;
            for (let i = 0; i < indices.length; ++i) {
                word_arr[indices[i]] = temp;
            }
            this.setState({
                word_arr: word_arr,
            });
        }
        else {
            //alert("Incorrect");
            this.setState((state) => ({
                num_incorrect: state.num_incorrect + 1,
            }));
        }

        
    }

    render() {
        if (this.state.num_correct === this.state.word.length) {
            alert("YOU WIN");
        }
        if (this.state.num_incorrect === 6) {
            alert("YOU LOSE");
        }

        return(
            <div>
                <div>
                    <Keyboard parentClick = {this.handleKeyboardClick.bind(this)}/>
                    <Word word_arr = {this.state.word_arr} />
                    <div className="Man">
                        <Man progress={this.state.num_incorrect}/>
                    </div>
                </div>

                <div>
                    <div>Num Correct: {this.state.num_correct}</div>
                    <div>Num Incorrect: {this.state.num_incorrect}</div>
                </div>
            </div>
        );
    }

}

ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function findAll(str, c) {
    let indices = [];
    for(let i = 0; i < str.length; ++i) {
        if (str[i] === c) {
            indices.push(i);
        }
    }
    return indices;
}
