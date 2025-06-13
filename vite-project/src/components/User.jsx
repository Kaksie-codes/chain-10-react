import React from 'react'

const User = ({name, ocupation, age, profilePicture}) => {
  return (
    <div>
        <img src={profilePicture} alt={name} />
        <h1>i am {name}, and i am a {ocupation} and i am {age} years old</h1>
    </div>
  )
}

export default User