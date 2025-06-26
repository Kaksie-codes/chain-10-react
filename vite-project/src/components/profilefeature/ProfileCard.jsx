import React from 'react'

const ProfileCard = ({data}) => {
    console.log({data})
    const { fname, lname, pic, occupation, age} = data;
  return (
    <div className='profile-card-container'>
        <div className="profile-card">
            <img src={pic} alt={`${fname} ${lname}`} className="profile-pic" />
            <h2>{fname} {lname}</h2>
            <p>Occupation: {occupation}</p>
            <p>Age: {age}</p>
        </div>
    </div>
  )
}

export default ProfileCard