import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './equipmentStyle.less'

class Equipment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  handleStatus = (numb) => {
    if (numb === '0') {
      return '停运'
    } else if (numb === '1') {
      return '在线'
    } else if (numb === '2') {
      return '报修'
    }
  }

  handleStatusColor = (numb) => {
    if (numb === '0') {
      return { background: 'red' }
    } else if (numb === '1') {
      return { background: 'green' }
    } else if (numb === '2') {
      return { background: 'grey' }
    }
  }

  render() {
    return (
      <span className='equipment'>
        <Link replace to={{ pathname: `/app/monitoring/`, state: { eid: this.props.eid }}} >
          <img className='Pic-equipment' alt='设备图像' src={ this.props.equipment_pic } />
        </Link>
          <div className='equipmentID'>{ this.props.equipment_desc }</div>
          <div className='machineName'>{ this.props.equipment_type } </div>
          <div className='status' style={ this.handleStatusColor(this.props.equipment_status) } >{ this.handleStatus(this.props.equipment_status) }</div>
      </span>
    )
  }
}

export default Equipment
