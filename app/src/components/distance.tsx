import socket from '@services/socket'
import * as React from 'react'
import { Progress } from 'reactstrap'

export interface DistanceObject {
  cm: number
  style: string
  label: string
}

export interface DistanceState {
  left: DistanceObject
  right: DistanceObject
}

const styles = {
  progressBar: {
    width: '100%',
    height: '60px',
    lineHeight: '60px',
    fontSize: '20px',
  },
}

export default class Distance extends React.Component<{}, DistanceState> {
  constructor(props) {
    super(props)

    this.state = {
      left: {
        cm: 0,
        style: 'danger',
        label: '',
      },
      right: {
        cm: 0,
        style: 'danger',
        label: '',
      },
    }
  }

  public render() {
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <Progress
                style={styles.progressBar}
                className={this.state.left.style}
                value={this.state.left.cm}
                label={this.state.left.label}
              />
            </div>
            <div className="col">
              <Progress
                style={styles.progressBar}
                className={this.state.right.style}
                value={this.state.right.cm}
                label={this.state.right.label}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  public componentDidMount() {
    socket.on('leftSensor.data', (data) => this.setLeftDistance(data.cm))
    socket.on('rightSensor.data', (data) => this.setRightDistance(data.cm))
  }

  public setLeftDistance = (cm) => {
    this.setState({
      left: {
        cm,
        style: this.distanceStyle(cm),
        label: `${cm}cm`,
      },
    })
  }

  public setRightDistance = (cm) => {
    this.setState({
      right: {
        cm,
        style: this.distanceStyle(cm),
        label: `${cm}cm`,
      },
    })
  }

  public distanceStyle = (cm) => cm < 30 ? 'danger' : cm < 60 ? 'warning' : 'success'
}
