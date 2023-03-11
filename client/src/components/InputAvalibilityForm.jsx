import React,{useState} from 'react'

const InputAvalibilityForm = () => {
 const [date, setDate] = useState('')
 const [timeFrom, setTimeFrom] = useState('')
 const [timeTo, setTimeTo] = useState('')
 const [error, setError] = useState(null)

 
  
const handleSubmit = async (e) => {
   e.preventDefault()

 

   const response = await fetch('/api/', {
     method: 'POST',
     body: JSON.stringify(Availabilities),
     headers: {
       'Content-Type': 'application/json'
     }
   })
   const json = await response.json()

   if (!response.ok) {
     setError(json.error)
   }
   if (response.ok) {
     setDate("")
     setTimeFrom('')
     setTimeTo('')

     console.log('My avalabilities', json)
   }

 }

 return (
   <form className="" onSubmit={handleSubmit}> 
     <h3>My Availability</h3>

     <label>DATE:</label>
     <input 
       type="date" 
       onChange={(e) => setDate(e.target.value)} 
       value=""
     />

     <label>FROM:</label>
     <input 
       type="time" 
       onChange={(e) => setTimeFrom(e.target.value)} 
       value=""
     />

     <label>TO:</label>
     <input 
       type="time" 
       onChange={(e) => setTimeTo(e.target.value)} 
       value="" 
     />

     <button>SUBMIT</button>
     {error && <div className="error">{error}</div>}
   </form>
 )
  


 }



export default InputAvalibilityForm