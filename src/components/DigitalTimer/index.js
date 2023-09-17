import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: false,
      minute: 25,
      second: 0,
      reset: true,
      setMinute: 25,
    }
    this.timerId = 0
  }

  tick = () => {
    const {minute, second} = this.state

    if (second === 0 && minute > 0) {
      this.setState(pre => ({minute: pre.minute - 1, second: 59}))
    } else if (second === 0 && minute === 0) {
      this.startOrPause()
    } else {
      this.setState(pre => ({second: pre.second - 1}))
    }
  }

  startOrPause = () => {
    const {start, reset} = this.state
    if (reset) {
      this.setState(pre => ({
        setMinute: pre.minute,
      }))
    }

    if (!start) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }
    this.setState(pre => ({
      start: !pre.start,
      reset: false,
    }))
  }

  plus = () => {
    this.setState(pre => ({minute: pre.minute + 1, setMinute: pre.minute + 1}))
  }

  minus = () => {
    this.setState(pre => ({minute: pre.minute - 1, setMinute: pre.minute - 1}))
  }

  reset = () => {
    clearInterval(this.timerId)
    this.setState({
      minute: 25,
      second: 0,
      reset: true,
      start: false,
      setMinute: 25,
    })
  }

  render() {
    const {start, minute, second, reset, setMinute} = this.state
    const m = minute < 10 ? `0${minute}` : `${minute}`
    const s = second < 10 ? `0${second}` : `${second}`
    const status = start ? 'Running' : 'Paused'
    const btnImgUrl = start
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const btnAlt = start ? 'pause icon' : 'play icon'
    const startBtnText = start ? 'Pause' : 'Start'

    return (
      <div className="Container">
        <h1 className="heading">Digital Timer</h1>
        <div className="flex">
          <div className="card">
            <div className="white">
              <h1 className="time">{`${m}:${s}`}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="content">
            <div className="buttonCard">
              <div className="btnCard">
                <img src={btnImgUrl} alt={btnAlt} className="img" />

                <button
                  type="button"
                  className="btnImg startBtn"
                  onClick={this.startOrPause}
                >
                  {startBtnText}
                </button>
              </div>

              <div className="btnCard">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="img"
                />

                <button
                  type="button"
                  className="btnImg startBtn"
                  onClick={this.reset}
                >
                  Reset
                </button>
              </div>
            </div>

            <p className="setTime">Set Timer limit</p>

            <div className="setting">
              <button
                type="button"
                className="btn"
                onClick={reset === true ? this.minus : undefined}
              >
                -
              </button>
              <div className="timeCard">
                <p className="minutesSet">{setMinute}</p>
              </div>

              <button
                type="button"
                className="btn"
                onClick={reset === true ? this.plus : undefined}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
