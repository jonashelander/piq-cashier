import React, { useEffect, useState } from "react";
import mockedUserData from '../mock/MockedUserData';
import { getUsers, updateUser } from "../api/authApi";

const CollapsibleComponent = () => {
    const [activeIndexes, setActiveIndexes] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(response => {
                setUsers(response.data);
            })
    }, []
    )

    const handleCollapsibleClick = (index) => {
        setActiveIndexes((prevIndexes) => {
            if (prevIndexes.includes(index)) {
                return prevIndexes.filter((prevIndex) => prevIndex !== index);
            } else {
                return [...prevIndexes, index];
            }
        });
    };

    const isCollapsibleActive = (index) => activeIndexes.includes(index);

    const handleInputChange = (index, field, value) => {
        setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers];
            updatedUsers[index] = { ...updatedUsers[index], [field]: value };
            return updatedUsers;
        });
    };

    const handleSaveChanges = async (index) => {
        const updatedUser = users[index];
        updateUser(users[index], users[index].userId);
    };


    return (
        <div className="backoffice">
            <h2>Users</h2>
            {users.map((user, index) => (
                <div className="userButton" key={index}>
                    <button
                        type="button"
                        className={`collapsible ${isCollapsibleActive(index) ? 'active' : ''}`}
                        onClick={() => handleCollapsibleClick(index)}
                    >
                        <div className="buttonName">
                            <p>UserId:</p> {user.userId}
                        </div>
                    </button>
                    <div className={`content ${isCollapsibleActive(index) ? 'active' : ''}`}>
                        <div className="bo-input">
                            <p>Firstname</p>
                            <input
                                type="text"
                                value={user.firstName}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Lastname</p>
                            <input
                                type="text"
                                value={user.lastName}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>UserId</p>
                            <input
                                type="text"
                                value={user.userId}
                                onChange={(e) => handleInputChange(index, 'userId', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>sessionId</p>
                            <input
                                type="text"
                                value={user.sessionId}
                                onChange={(e) => handleInputChange(index, 'sessionId', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Kyc Status</p>
                            <input
                                type="text"
                                value={user.kycStatus}
                                onChange={(e) => handleInputChange(index, 'kycStatus', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Balance</p>
                            <input
                                type="text"
                                value={user.balance}
                                onChange={(e) => handleInputChange(index, 'balance', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Date of birth</p>
                            <input
                                type="text"
                                value={user.dob}
                                onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Gender</p>
                            <input
                                type="text"
                                value={user.sex}
                                onChange={(e) => handleInputChange(index, 'sex', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Country</p>
                            <input
                                type="text"
                                value={user.country}
                                onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>City</p>
                            <input
                                type="text"
                                value={user.city}
                                onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>State</p>
                            <input
                                type="text"
                                value={user.state}
                                onChange={(e) => handleInputChange(index, 'state', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Zip</p>
                            <input
                                type="text"
                                value={user.zip}
                                onChange={(e) => handleInputChange(index, 'zip', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Phone number</p>
                            <input
                                type="text"
                                value={user.phone}
                                onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Email</p>
                            <input
                                type="text"
                                value={user.email}
                                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>Password</p>
                            <input
                                type="text"
                                value={user.password}
                                onChange={(e) => handleInputChange(index, 'password', e.target.value)}
                            />
                        </div>
                        <div className="bo-input">
                            <p>User activated</p>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={user.activated}
                                    onChange={(e) => handleInputChange(index, 'activated', e.target.checked)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="bo-input">
                            <button className="save-button" onClick={() => handleSaveChanges(index, user.userId)}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollapsibleComponent;
