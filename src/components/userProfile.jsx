import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import NavBar from "./navbar";
import Arrows from './arrows.jsx';
import UserAuthentication from "./userAuthentication.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import OrangeSwoop from "./Headers and Footers/orangeSwoop.jsx";

const GetProfileResponse = ({ handleUserLogin, authentication }) => {
  const [userProfileHistory, setUserProfileHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [authCurrentUser, setAuthCurrentUser] = useState(null);
  const [userFirstName, setUserFirstName] = useState([]);

  // Handler function when a specific card is clicked
  // Toggle selectedDate state variable to expand or minimize card
  const handleDateClick = (index) => {
    setSelectedDate(selectedDate === index ? null : index);
  };

  // Handler function to expand selections inside of card
  // Toggle selectedItem state variable to expand or minimize details
  const handleSelectionsClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  console.log("Auth Current User from userProfile is: " + authCurrentUser);

  //Filters.jsx - User Authentication Observer
  //The observer tracks the user authentication token across the different components
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthCurrentUser(user);
        console.log("userProfile Observer: " + user);
        handleUserLogin(user); // Call the handler to update user state in parent component
        axios
          .get(
            `https://giftfairy-be-server.onrender.com/api/user/response/${user.email}/`
          )
          .then((response) => {
            const items = response.data;
            setUserFirstName(items);
          });
        axios
          .get(
            `https://giftfairy-be-server.onrender.com/api/filter/response/${user.email}/`
          )
          .then((response) => {
            const items = response.data;
            setUserProfileHistory(items);
          });
      } else {
        // No user is signed in
        setAuthCurrentUser(null);
        setUserFirstName([]);
      }
    });
    return () => unsubscribe(); // Cleanup function to unsubscribe from the observer
  }, []);

  // User Profile Page UI return
  return (
    <>
      <OrangeSwoop fillOpacity={".75"}/>


      {/* Navigation bar that includes home button, app title, and profile button */}
      <div className="navbar-ProgressBar-Container" style={{ height: "81px" }}>
        <NavBar />
      </div>

      {/* Container that holds user login page or user selection history and logout button via authentication page */}
      <div className="userProfileContainer">
        {/* If user is NOT logged in display userAuthentication component to login. */}
        {!authCurrentUser && (
          <>
            <h1>User Profile</h1>
            <UserAuthentication
              handleUserLogin={handleUserLogin}
              authentication={authentication}
            />
          </>
        )}

        {/* If there is a current user (checked via useEffect) then display user's selection history */}
        {authCurrentUser && (
          <>
            {/* If able to retrieve user's first name from observer then display */}
            {userFirstName.length > 0 ? 
              <h1>{userFirstName[0].first_name}'s Profile</h1> 
              : 
              <h1>Profile</h1>}

            <h2>Selection History</h2>
            
            {/* User History Container */}
            <div className="userProfileHistory">
              {/* Map through API GET response for user's selection/gift idea history */}
              {userProfileHistory
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) //sort history by latest selections/gift ideas
                .map((item, index) => (
                  <div key={index} className="userHistoryByDate">
                    <div key={index} className="userHistoryByDateHeader">
                      <h4>Recipient: {item.giftee_name}</h4>
                      {selectedDate == index ? 
                      (
                        <Arrows onClickHandler={handleDateClick} index={index} direction={'up'}/>
                      ) 
                        : 
                      (
                        <Arrows onClickHandler={handleDateClick} index={index} direction={'down'}/>
                      )
                      }
                    </div>
                    {selectedDate == index && (
                      <div className="userHistory">
                        <h4>
                          Date:{" "}
                          {dayjs(item.created_at).format("MM-DD-YY hh:mm A")}
                        </h4>
                        <div className="userHistorySelections">
                          <h4>Selections:</h4>
                          {selectedItem == index ? 
                            (
                              <Arrows onClickHandler={handleSelectionsClick} index={index} direction={'up'}/>
                            ) 
                              : 
                            (
                               <Arrows onClickHandler={handleSelectionsClick} index={index} direction={'down'}/>
                            )
                          }
                        </div>
                        {selectedItem === index && (
                          <div className="details">
                            <h5>Age: {item.age}</h5>
                            <h5>Gender: {item.gender}</h5>
                            <h5>Relationship: {item.relationship}</h5>
                            <h5>Price Range: {item.price_range}</h5>
                            <h5>Occasion: {item.occasion}</h5>
                            <h5>Gift Type: {item.gift_type}</h5>
                            <h5>Interest: {item.interest}</h5>
                            <h5>Activity: {item.activity_level}</h5>
                            <h5>Personality: {item.personality}</h5>
                            <h5>Nature: {item.nature}</h5>
                          </div>
                        )}
                        <div className="userHistoryGeneratedGifts">
                          <h4>Generated Gift Ideas:</h4>
                          {item.item_title_string.split(",").map((gift, index) => (
                              <a key={index} href={`https://www.amazon.com/s?k=${encodeURIComponent(gift)}&tag=${"giftfairy0c9-20"}`} target="_blank" rel="noreferrer">
                                <h5 key={index}>{index + 1}. {gift}</h5>
                              </a>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <UserAuthentication
              handleUserLogin={handleUserLogin}
              authentication={authentication}
            />
          </>
        )}
      </div>
    </>
  );
};

export default GetProfileResponse;
