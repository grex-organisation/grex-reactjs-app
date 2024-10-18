import React, { useState, useEffect } from 'react'
import { getToken } from '../../services/JWTService';
import axios from 'axios';

export default function AdminManageGroup() {

    const [groups, setGroups] = useState([]);
    const [formData,setFormData] = useState({"groupId":"","groupName":""});
    const [flag,setFlag] = useState(true);

    async function loadGroups() {
        try {
            const token = getToken();
            const response = await axios.get("https://sambha.in/api/grex/admin/groups", { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
            const final_data = response.data.data;
            setGroups(final_data);

        } catch (error) { }

    }

    useEffect(() => { loadGroups() }, [])
  
  function onChangeFieldValue(e){

    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);

    const isFormValid = newFormData.groupId.trim() !== "" && newFormData.groupName.trim() !== "";
    setFlag(!isFormValid);

    console.log(formData);
  }

  function validate(){
    
  }

  async function onFormSubmit(e){
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post('https://sambha.in/api/grex/admin/groups/add',formData, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (response.data.code === 200) {
        console.log("group added OK");
        setGroups([...groups,formData]);
        setFormData({"groupId":"","groupName":""});
        console.log(formData);
      }
  } catch (error) {
  }
  }

  async function deleteGroup(groupId){
    try {
      const token = getToken();
      const response = await axios.get(`https://sambha.in/api/grex/admin/groups/delete/`+groupId,{ headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (response.data.code === 200) {
        console.log("group deleted");
        setGroups(groups.filter((group)=>(group.groupId !== groupId)))
      }
  } catch (error) {
    console.log(error)
  }
  }

  async function updateStatus(groupId){
    try {
      const token = getToken();
      const response = await axios.get(`https://sambha.in/api/grex/admin/groups/`+groupId+"/status",{ headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
      if (response.data.code === 200) {
        console.log("status flipped");
        loadGroups();
      }
  } catch (error) {
    console.log(error)
  }
  }


    return (
        <div className="container">
            <div className='columns'>
                <div className='column'>
                    <table className="table is-fullwidth">

                        <thead>
                            <tr>
                                <th>Group Id</th>
                                <th>Group Name</th>
                                <th>Group Status</th>
                                <th>Group Operation</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                groups.map((item) => (
                                    <tr key={item.groupId}>
                                        <td>{item.groupId}</td>
                                        <td>{item.groupName}</td>
                                        <td>{item.isGroupLive == "Y" ? <span className="tag is-success">LIVE</span> : <span className="tag is-danger">DRAFT</span>}</td>
                                        <td>
                                            <button className="button is-warning  is-rounded m-1" onClick={() => updateStatus(item.groupId)}>Flip Status</button>
                                            <button className="button is-danger is-rounded m-1" onClick={() => deleteGroup(item.groupId)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                         <tr>
                            <td><input className="input" type="text" placeholder="enter group id" name="groupId" value={formData.groupId} onChange={onChangeFieldValue}/></td>
                            <td><input className="input" type="text" placeholder="enter group name" name="groupName" value={formData.groupName} onChange={onChangeFieldValue}/></td>
                            <td><button className="button is-primary" disabled={flag} onClick={onFormSubmit}>Add</button></td>
                        </tr>
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}
