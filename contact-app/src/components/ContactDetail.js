import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user1.png'

const ContactDetail = (props) => {
    const { name, email } = props.location.state.contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div" >
                <Link to="/">
                    <button className="ui center floated primary button" style={{ marginRight: "50%", marginLeft: "37%", width: "300px" }} >Back to the Contact List</button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetail
