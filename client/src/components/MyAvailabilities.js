import { useEffect, useState } from "react";


const MyAvailabilities = () => {
 const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`api/localhost:3000/availabilities`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData.availabilities);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table">
      <tbody>
       
        <tr>
          <th>Name</th>
          <th>Availabilityid</th>
          <th>Date</th>
          <th>TimeFrom</th>
          <th>TimeTo</th>
        </tr>
        
        {data.map((data, index) => (
          <tr key={index}>
            <td>{data.username}</td>
            <td>{data.availabilityid}</td>
            <td>{data.date}</td>
            <td>{data.time_from}</td>
            <td>{data.time_to}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
  
}

export default MyAvailabilities