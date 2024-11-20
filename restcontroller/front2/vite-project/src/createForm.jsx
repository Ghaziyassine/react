import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AttributeForm = ({postData}) => {
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
            title: 'Create Form',
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
                postData(formData); // Pass the captured data directly to postData
            }
        });


    };

    return (
        <div>
            <button onClick={() => {
                showAttributeForm();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
                    <path fill="#0eaa28" d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2m8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z" />
                    <path fill="none" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7z" />
                </svg>
            </button>

        </div>
    );
};

export default AttributeForm;
