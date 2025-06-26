import React from 'react'
import ProfileCard from './ProfileCard'

const DisplayProfiles = ({profiles}) => {
  return (
    <div>
        <h1>Display User Profiles</h1>
        {
            profiles.length === 0 && <p>No profiles available. Please add a profile.</p>
        }
        <div className='profile-cards-container'>
            {            

                profiles.map((profile, index) => (
                    <ProfileCard key={index} data={profile}/>
                ))
            }
        </div>
    </div>
  )
}

export default DisplayProfiles