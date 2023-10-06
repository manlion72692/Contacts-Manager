import Logout from '../pages/Logout';
import '../CSS files/TotalContacts.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useDropzone } from 'react-dropzone';

const TotalContacts = () => {

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({});

    useEffect(() => {
        axios.get('api/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error("Error fetching contacts:", error))
    }, []);

    const fetchContacts = () => {
        let apiUrl = "/api/contacts";

        if (search) {
            apiUrl += `?search=${search}`
        } else if (filter) {
            apiUrl += `?filter=${filter}`
        }

        axios.get(apiUrl)
            .then(response => setContacts(response.data))
            .catch(error => console.error("Error fetching contacts", error))
    }

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (isEditing) {
                saveEditedContact();
            } else {
                fetchContacts();
            }
        }
    }

    const handleEditClick = (contact) => {
        setIsEditing(true);
        setEditedContact({ ...contact });
    }

    const saveEditedContact = () => {
        if (editedContact._id) {
            axios.put(`/api/contacts/${editedContact._id}`, editedContact)
                .then(response => {
                    const updatedContacts = contacts.map(contact =>
                        contact._id === response.data._id ? response.data : contact
                    );
                    setContacts(updatedContacts);
                    setIsEditing(false);
                    setEditedContact({});
                })
                .catch(error => console.error("Error updating contact:", error))
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedContact({ ...editedContact, [name]: value });
    }

    const deleteContact = (contactId) => {
        axios.delete(`/api/contacts/${contactId}`)
            .then((response) => {
                if (response.status === 200) {
                    setContacts((prevContacts) =>
                        prevContacts.filter(
                            (contact) => contact._id !== contactId
                        )
                    );
                    // const updatedContacts = contacts.filter(
                    //     (contact) => contact._id !== contactId
                    // );
                    // setContacts(updatedContacts);

                } else {
                    console.error("Error deleting contact:", response.data);
                }
            })

            .catch((error) => console.error("Error deleting contact:", error))
    }   

    const handleCheckboxChange = (contactId) => {
        if (selectedRows.includes(contactId)) {
            setSelectedRows((prevSelected) => prevSelected.filter((id) => id !== contactId));
        } else {
            setSelectedRows((prevSelected) => [...prevSelected, contactId]);
        }
    };

    const handleDeleteClick = () => {
        axios
            .delete("/api/contacts", { data: { selectedRows } })
            .then((response) => {
                if (response.status === 200) {
                    // Update the contacts list to remove deleted rows
                    setContacts((prevContacts) =>
                        prevContacts.filter((contact) => !selectedRows.includes(contact._id))
                    );
                    // Clear selected rows
                    setSelectedRows([]);
                } else {
                    console.error("Error deleting contacts:", response.data);
                }
            })
            .catch((error) => console.error("Error deleting contacts:", error));
    };

        return (
            <div className="total_contacts">
                <div className="left_div">
                    <img src="/Images/Logo.png" alt="Logo" width="30px" height="30px" style={{ marginTop: '30px' }} />
                    <div className="dashboard">
                        <img src="/Images/dashboard.png" alt="Dashboard" width="15px" height="15px" style={{ marginTop: '20px' }} />&nbsp;<span style={{ fontWeight: 'bold', marginTop: '19px', fontFamily: 'Titillium Web' }}>Dashboard</span>
                    </div>
                    <div className="box">
                        <img src="/Images/contacts.png" alt="Dashboard" width="15px" height="15px" />&nbsp;&nbsp;<span style={{ color: 'white', fontFamily: 'Titillium Web' }}>Total Contacts</span>
                    </div>
                    <div className="logout">
                        <img src="/Images/logout.png" alt="Dashboard" width="20px" height="20px" />&nbsp;&nbsp;<span style={{ fontWeight: 'Bold', fontFamily: 'Titillium Web' }}><Logout /></span>
                    </div>
                </div>
                <div className="right_div">
                    <div className="top_right_div">
                        <div className="navbar">
                            <span style={{ marginTop: '15px', fontSize: '30px', marginLeft: '30px', color: '#454545', fontWeight: 'Bold' }}>Total Contacts</span>
                            <div className="search_bar">
                                <img src="/Images/Vector.png" width='32px' height='32px' className="search_img" alt="search_bar" />
                                <input
                                    type='email'
                                    className="search_input"
                                    placeholder='Search by Email id.....'
                                    style={{ outline: 'none' }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={handleEnterKeyPress}
                                />
                            </div>
                            <div className="admin">
                                <div className="admin_photo"></div>
                                <div className="name">
                                    <span>Narasimha</span>
                                    <span>Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="middle_right_div">
                        <div className="date">
                            &nbsp;<img src="/Images/date.png" alt="date" width="15px" height="15px" /><button style={{ fontWeight: "Bold", marginTop: '0px', height: '25px', color: 'black', backgroundColor: 'white' }}>Select Date</button><img src="/Images/dropdown.png" alt="dropdown" />
                        </div>
                        <div className="filter">
                            &nbsp;<img src="/Images/filter.png" alt="date" width="15px" height="15px" /><button style={{ fontWeight: "Bold", marginTop: '0px', height: '25px', color: 'black', backgroundColor: 'white' }}>Filter</button><img src="/Images/dropdown.png" alt="dropdown" />
                        </div>
                        <div className="delete">
                            &nbsp;<img src="/Images/delete.png" alt="date" width="15px" height="15px" /><button onClick={handleDeleteClick} style={{ fontWeight: "Bold", marginTop: '0px', height: '25px', color: 'black', backgroundColor: 'white' }}>Delete</button>
                        </div>
                        <div className="import">
                            &nbsp;<img src="/Images/import.png" alt="import" /><button style={{ fontWeight: 'Bold', marginTop: '0px', height: '25px', color: 'black', backgroundColor: 'white' }}>Import</button>
                        </div>
                        <div className="export">
                            &nbsp;<img src="/Images/export.png" alt="export" /><button style={{ fontWeight: 'Bold', marginTop: '-1px', height: '25px', color: 'black', backgroundColor: 'white' }}>Export</button>
                        </div>
                    </div>
                    <div className="right_end_div">
                        <table>
                            <thead>
                                <tr className="head-row">
                                    <th className="th">Select</th>
                                    <th className="th">Name</th>
                                    <th className="th">Designation</th>
                                    <th className="th">Company</th>
                                    <th className="th">Industry</th>
                                    <th className="th">Email</th>
                                    <th className="th">Phone Number</th>
                                    <th className="th">Country</th>
                                    <th className="th" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(contact._id)}
                                                checked={selectedRows.includes(contact._id)}
                                             />
                                        </td>
                                        {/* <td>{contact.name}</td> */}
                                        {/* <td>{contact.designation}</td> */}
                                        {/* <td>{contact.company}</td> */}
                                        {/* <td>{contact.industry}</td> */}
                                        {/* <td>{contact.email}</td> */}
                                        {/* <td>{contact.phone}</td> */}
                                        {/* <td>{contact.country}</td> */}
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="name"
                                            value={editedContact.name}
                                            onChange={handleInputChange}
                                        />) : (contact.name)}</td>
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="designation"
                                            value={editedContact.designation}
                                            onChange={handleInputChange}
                                        />) : (contact.designation)}</td>
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="company"
                                            value={editedContact.company}
                                            onChange={handleInputChange}
                                        />) : (contact.company)}</td>
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="industry"
                                            value={editedContact.industry}
                                            onChange={handleInputChange}
                                        />) : (contact.industry)}</td>
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="email"
                                            value={editedContact.email}
                                            onChange={handleInputChange}
                                        />) : (contact.email)}</td>
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="phone"
                                            value={editedContact.phone}
                                            onChange={handleInputChange}
                                        />) : (contact.phone)}</td>
                                        <td>{isEditing && editedContact._id === contact._id ? (<input
                                            type="text"
                                            name="country"
                                            value={editedContact.country}
                                            onChange={handleInputChange}
                                        />) : (contact.country)}</td>

                                        <td className="action">
                                            {isEditing && editedContact._id === contact._id ? (<button className="image-button" onClick={saveEditedContact}>Save</button>) : (<button className="image-button" onClick={() => handleEditClick(contact)}><img src="/Images/edit.png" alt="edit" /></button>)}
                                            <button className="image-button" onClick={() => deleteContact(contact._id)}><img src="/Images/red_delete.png" alt="delete" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
export default TotalContacts;