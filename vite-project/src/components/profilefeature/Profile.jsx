import React, { useState } from 'react'
import InputProfileData from './InputProfileData';
import './profile.css'
import DisplayProfiles from './DisplayProfiles';

const Profile = () => {
     const [profileData, setProfileData] = useState({
            fname: '',
            lname: '',
            pic: '',
            occupation: '',
            age: ''
        })

     const [userProfiles, setUserProfiles] = useState([
            // {
            //     fname: 'John',
            //     lname: 'Doe',
            //     pic: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
            //     occupation: 'Software Engineer',
            //     age: 30
            // },
            // {
            //     fname: 'Jane',
            //     lname: 'Smith',
            //     pic: 'https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg',
            //     occupation: 'Data Scientist',
            //     age: 28
            // }
        ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', profileData);
        // Add the new profile to the userProfiles state
        setUserProfiles([...userProfiles, profileData]);
        // Reset the profileData state
        setProfileData({
            fname: '',
            lname: '',
            pic: '',
            occupation: '',
            age: ''
        });
    }

  return (
    <div>
        <div className="container">
            <h1>Profile Feature</h1>
            <div  className="profile-content">
                <InputProfileData 
                    profileData={profileData} 
                    setProfileData={setProfileData}
                    handleSubmit={handleSubmit}
                />
                <DisplayProfiles 
                    profiles={userProfiles}
                />
            </div>
        </div>
    </div>
  )
}

export default Profile