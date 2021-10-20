import React from 'react';
import styles from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    localText: this.props.profileStatusText || '',
    placeholder: 'введите статус'
  }

  editModeOn = () => {
    this.setState({
      editMode: true
    })
  }

  editModeOff = () => {
    this.setState({
      editMode: false
    })
  }

  onStatusInput = (edited) => {
    this.setState({
      localText: edited
    })
  }

  render() {
    return <div className={styles.pStatus}>

      { !this.state.editMode &&
        <div className={styles.pStatusText}onDoubleClick={this.editModeOn}>
          <span >{this.state.localText || 'no status'}</span>
        </div>
      }
      { this.state.editMode &&
        <div>
          <textarea className={styles.pStatusTextInput}
            placeholder={this.state.placeholder}
                    autoFocus={true}
                    value={this.state.localText}
                    onChange={e => {this.onStatusInput(e.target.value)}}
                    onKeyDown={e => { if (e.key === 'Enter') this.editModeOff()}}
                    onBlur={this.editModeOff}
          />
        </div>
      }
    </div>
  }
}

export default ProfileStatus
