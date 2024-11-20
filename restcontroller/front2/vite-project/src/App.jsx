import { useEffect, useState } from 'react'

import axios from 'axios';
import LoginForm from './createForm';
import UpdateForm from './updateForm';


function App() {
  const [data, setData] = useState([]);
  const createCompte = async (data) => {
    try {
      const response = await axios.post('http://localhost:8082/banque/comptes', data);
      console.log("Account created successfully:", response.data);
      getComptes();
    } catch (error) {
      console.error("Error creating account:", error.response || error.message);
    }
  };
  const getComptes = () => {

    axios.get('http://localhost:8082/banque/comptes')
      .then((response) => {
        console.log(response)

        console.log(response.data)
        setData(response.data)
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }
  const postData = (x) => {
    axios.post('http://localhost:8082/banque/comptes', x)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            console.log("enter post data");
            getComptes();

        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
}

const updateCompte = async (id, updatedData) => {
  try {
    console.log("Updating account with id:", id);
    const response = await axios.put(`http://localhost:8082/banque/comptes/${id}`, updatedData);
    console.log("Account updated successfully:", response.data);
    getComptes(); // Refresh the data
  } catch (error) {
    console.error("Error updating account:", error.response || error.message);
  }
};

  useEffect(() => (getComptes()), [])


  const deleteCompte = (id) => {
    axios.delete(`http://localhost:8082/banque/comptes/${id}`)
      .then((response) => {
        console.log(response)

        console.log(response.data)
        getComptes()
      })
      .catch((error) => {
        console.error('There was an error!', error);
      })
  }


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Accounts</h2>
          <div className="flex justify-start">
          <div className="ml-1">
            <LoginForm postData={postData} /> 
          </div>
         </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solde
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.solde}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.dateCreation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-2">
                      <UpdateForm id={item.id} updateCompte={updateCompte} />
                      <button
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                        onClick={() => {
                          deleteCompte(item.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="fill-current text-red-600"
                        >
                          <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
  

}
export default App
