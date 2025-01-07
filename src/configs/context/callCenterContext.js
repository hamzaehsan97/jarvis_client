import React, { createContext, useState, useContext } from 'react';

// Create the call center context
export const CallCenterContext = createContext();

// Create the call center provider component
export const CallCenterProvider = ({ children }) => {
    // Define the state variables for the call center
    const [callCenterDetails, setCallCenterDetails] = useState(null);

    // Define any functions or methods related to the call center

    // Create an object with the values to be provided by the context
    const callCenterContextValues = {
        callCenterDetails
        // Add any other values or functions here
    };

    // Return the provider component with the context values
    return <CallCenterContext.Provider value={callCenterContextValues}>{children}</CallCenterContext.Provider>;
};

// Custom hook for accessing the context
export const useCallCenterContext = () => useContext(CallCenterContext);
