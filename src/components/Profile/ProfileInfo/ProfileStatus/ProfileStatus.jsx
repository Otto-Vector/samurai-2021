import React from 'react';
import styles from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {

  render() {
    return <div className={styles.pStatus}>
      <div>
        <span>{this.props.profileStatusText || 'без статуса'}</span>
      </div>
      <div>
        <textarea placeholder={'введите статус'}
                  value={this.props.profileStatusText || ''}
                  onChange={()=>{}}
                  onBlur={()=>{}}
        />
      </div>
    </div>
  }
}

export default ProfileStatus
