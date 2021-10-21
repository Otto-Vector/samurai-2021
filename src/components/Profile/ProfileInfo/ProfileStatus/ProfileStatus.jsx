import React from 'react';
import styles from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    localStatusText: this.props.profileStatusText || '',
    placeholder: 'введите статус'
  }

  enableEditMode = () => {
    // console.log(this.props)
    this.setState({
      editMode: this.props.isAuthProfile
    })
  }

  disableEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.localStatusText)
  }

  onStatusInput = (e) => {
    this.setState({
      localStatusText: e.currentTarget.value
    })
  }

  render() {
    return <div className={styles.pStatus}>

      {!this.state.editMode &&
      <div className={styles.pStatusText}
           onDoubleClick={this.enableEditMode}>
        <span>{this.props.profileStatusText || 'no status'}</span>
      </div>
      }
      {this.state.editMode &&
      <div>
          <textarea className={styles.pStatusTextInput}
                    placeholder={this.state.placeholder}
                    autoFocus={true}
                    value={this.state.localStatusText}
                    onChange={this.onStatusInput}
                    onKeyDown={e => {
                      if (e.key === 'Enter') this.disableEditMode()
                    }}
                    onBlur={this.disableEditMode}
          />
      </div>
      }
    </div>
  }
}

export default ProfileStatus
