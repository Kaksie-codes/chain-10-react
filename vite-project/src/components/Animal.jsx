import React, { useState } from 'react'

const Animal = () => {
    const _animals = ["sheep", "goat", "pig", "frog", "Zebra"];
    const [animals, setAnimals] = useState(_animals)
    const [newAnimal, setNewAnimal] = useState('');

    const handleAdd = () => {
        console.log('clicked')
        let newAnimalArray = animals;
        newAnimalArray.push(newAnimal);
        setAnimals(newAnimalArray)
        setNewAnimal('')
        console.log({animals})
    }

  return (
    <div>
        <div>
            <input 
                type="text" 
                placeholder='Add new Animal'
                value={newAnimal}
                onChange={(e) => setNewAnimal(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
        </div>
        <ul>
            {
                animals.map((amimal, i) => (
                    <li key={i}>{amimal}</li>
                ))
            }
        </ul>
    </div>
  )
}

export default Animal