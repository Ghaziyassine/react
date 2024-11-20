import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateForm = ({id,updateCompte}) => {
    const [formData, setFormData] = useState([]);
    const getComptes = () => {

        axios.get('http://localhost:8082/banque/comptes')
            .then((response) => {
                console.log(response)

                console.log(response.data)
                setFormData(response.data)
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }
    
    const showAttributeForm = () => {
        let soldeInput;
        let dateCreationInput;
        let typeSelect;
        Swal.fire({
            title: 'Update Form',
            html: `
                <input type="number" id="solde" class="swal2-input" placeholder="Solde (integer)">
                <input type="date" id="dateCreation" class="swal2-input">
                <select id="type" class="swal2-select">
                
                    <option value="COURANT">COURANT</option>
                    <option value="EPARGNE">EPARGNE</option>
                </select>
            `,
            confirmButtonText: 'Submit',
            focusConfirm: false,
            didOpen: () => {
                const popup = Swal.getPopup();
                soldeInput = popup.querySelector('#solde');
                dateCreationInput = popup.querySelector('#dateCreation');
                typeSelect = popup.querySelector('#type');
                soldeInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
                dateCreationInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm();
            },
            preConfirm: () => {
                const solde = parseFloat(soldeInput.value);
                const dateCreation = dateCreationInput.value;
                const type = typeSelect.value;
                if (!solde || !dateCreation || !type) {
                    Swal.showValidationMessage(`Please fill out all fields`);
                }
                return { solde, dateCreation, type };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = result.value; // Capture the data from Swal
                console.log('Submitted form data:', formData); // Correctly log the form data
                updateCompte(id,formData); // Pass the captured data directly to postData
            }
        });


    };

    return (
        <div>
            <button onClick={() => {
                showAttributeForm();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#1425a9" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
            </button>

        </div>
    );
};

export default UpdateForm;
