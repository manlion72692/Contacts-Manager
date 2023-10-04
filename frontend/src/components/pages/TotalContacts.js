import Logout from '../pages/Logout';
import '../CSS files/TotalContacts.css';

const TotalContacts = () => {

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
                                style={{ outline: 'none'}}
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
                        &nbsp;<img src="/Images/delete.png" alt="date" width="15px" height="15px" /><button style={{ fontWeight: "Bold", marginTop: '0px', height: '25px', color: 'black', backgroundColor: 'white' }}>Delete</button>
                    </div>
                    <div className="import">
                        &nbsp;<img src="/Images/import.png" alt="import" /><button style={{ fontWeight: 'Bold', marginTop: '0px', height: '25px', color: 'black', backgroundColor: 'white' }}>Import</button>
                    </div>
                    <div className="export">
                        &nbsp;<img src="/Images/export.png" alt="export" /><button style={{ fontWeight: 'Bold', marginTop: '-1px', height: '25px', color: 'black', backgroundColor: 'white' }}>Export</button>
                    </div>
                </div>
                <div className="right_end_div"></div>
            </div>
        </div>
    )
}

export default TotalContacts;