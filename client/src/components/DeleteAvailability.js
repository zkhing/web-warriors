import React from "react";
import Button from "react-bootstrap/Button";

const DeleteAvailability = ({ availability, onDelete }) => {
  const handleDelete = () => {
    onDelete(availability);
    fetch(`/api/`,
     {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
         },
         body: JSON.stringify(),
     })
     .then((res) => res.json())
     .then((data) => {
       if (data.error) {
         alert(data.error);
       } else {
         alert("your availability is deleted!");
         window.location.reload();
       }
     })
     .catch((err) => console.log(err));
  };

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteAvailability;
