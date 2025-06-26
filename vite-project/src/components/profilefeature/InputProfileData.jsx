import React, { useEffect } from 'react'

const InputProfileData = ({profileData, setProfileData, handleSubmit}) => {

   

    useEffect(() => {
        console.log({profileData})
        // console.log('i am happy')
    }, [profileData])


  

  return (
    <div className='input-profile-data'>
        
            <h2>Input Profile Data</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="fname">First Name:</label>
                    <input 
                        type="text" 
                        id="fname" 
                        name="fname" 
                        value={profileData.fname}
                        onChange={(e) => setProfileData({ ...profileData, fname: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="lname">Last Name:</label>
                    <input 
                        type="text" 
                        id="lname" 
                        name="lname" 
                        value={profileData.lname}
                        onChange={(e) => setProfileData({ ...profileData, lname: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="pic">Profile Picture:</label>
                    <input 
                        type="text" 
                        id="pic" 
                        name="pic" 
                        value={profileData.pic}
                        onChange={(e) => setProfileData({ ...profileData, pic: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="occupation">Occupation:</label>
                    <input 
                        type="text" 
                        id="occupation" 
                        name="occupation" 
                        value={profileData.occupation}
                        onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="age">Age:</label>
                    <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        value={profileData.age}
                        onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                    />
                </div>
                <button>Submit</button>
            </form>
     
    </div>
  )
}

export default InputProfileData