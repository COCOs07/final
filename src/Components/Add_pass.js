import styled from "styled-components";
import React, { useState } from 'react';
import { database, ref, set, get } from '../Firebase/Firebase';  // Import `get` from Firebase
import Swal from 'sweetalert2';

const Add_pass = () => {

  const handleAddPassenger = () => {
    Swal.fire({
      title: 'Add New Passenger',
      input: 'text',
      inputLabel: 'Enter passenger name',
      inputPlaceholder: 'Passenger name',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const passengerName = result.value;
        if (passengerName) {
          const newPassengerRef = ref(database, 'passengers_name/' + passengerName.replace(' ', '_'));
          set(newPassengerRef, {
            name: passengerName,
            timestamp: new Date().toISOString(),
          }).then(() => {
            Swal.fire('Success', 'Passenger added successfully!', 'success');
          }).catch((error) => {
            Swal.fire('Error', error.message, 'error');
          });
        } else {
          Swal.fire('Error', 'Passenger name cannot be empty', 'error');
        }
      }
    });
  };

  return (
    <StyledWrapper>
      <button onClick={handleAddPassenger}>
        <span>+ 
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" /> ผู้โดยสาร
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    border: 2px solid #24b4fb;
    background-color: #24b4fb;
    border-radius: 0.9em;
    cursor: pointer;
    padding: 0.8em 1.2em 0.8em 1em;
    transition: all ease-in-out 0.2s;
    font-size: 16px;
  }

  button span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
  }

  button:hover {
    background-color: #0071e2;
  }
`;

export default Add_pass;
