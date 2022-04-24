import React, {useState} from 'react'
import tapsService from '../services/taps'
import styles from '../Create.module.css'

const Create = ({ updateNotification }) => {
  const [newTap, setNewTap] = useState({})

  const createNewTap = async () => {
    try {
      let response = await tapsService.create(newTap)
      console.log(response)
      updateNotification(`New beer ${response.name} was created!`, 'success')
    } catch (error) {
      updateNotification('New beer could not be created', 'error')
  }
}

  const updateTap = (keyName, value) => {
    let newEntry = {[keyName]: value}
    setNewTap({...newTap, ...newEntry})
    console.log(newTap)
  }

  return (
    <div class={styles.CreateForm}>
      <form onSubmit={createNewTap}>
        <p>Name</p>
        <input 
          type="text" 
          name="Name" 
          onChange={({target}) => updateTap('name', target.value)} 
        />
        <p>Style</p>
        <input 
          type="text" 
          name="Style" 
          onChange={({target}) => updateTap('style', target.value)} 
        />
        <p>ABV</p>
        <input 
          type="text" 
          name="ABV" 
          onChange={({target}) => updateTap('abv', target.value)} 
        />
        <p>IBU</p>
        <input 
          type="text" 
          name="IBU" 
          onChange={({target}) => updateTap('ibu', target.value)} 
        />
        <p>Serving Type</p>
        <input 
          type="text" 
          name="Type" 
          onChange={({target}) => updateTap('type', target.value)} 
        />
        <p>Unit of Measurement</p>
        <input 
          type="text" 
          name="Unit" 
          onChange={({target}) => updateTap('unit', target.value)} 
        />
        <p>Remaining Units</p>
        <input 
          type="text" 
          name="Remaining" 
          onChange={({target}) => updateTap('remaining', target.value)} 
        />
        <p>Brewery</p>
        <input 
          type="text" 
          name="Brewery" 
          onChange={({target}) => updateTap('brewery', target.value)} 
        />
        <p>Color</p>
        <input 
          type="text" 
          name="Color" 
          onChange={({target}) => updateTap('color', target.value)} 
        />
        <p>Description</p>
        <input 
          type="text" 
          name="Description" 
          onChange={({target}) => updateTap('description', target.value)} 
        />
        <br />
        <br />
        <button type="submit">Create new tap</button>
      </form>
    </div>
  )
}

export default Create