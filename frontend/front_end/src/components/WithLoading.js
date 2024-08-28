 import LoginScreen from '../../src/login/LoginSignUpScreen';
// import LoginScreen from '../screens/GroupScreen';
// import LoginScreen from '../screens/MainScreen';
import React, {useEffect, useState} from 'react';

export default function WithLoading(WrappedComponent) {
    return function LoadingComponent(props) {
      const [isLoading, setIsLoading] = useState(true);
  
      useEffect(() => {
        // Simulate some loading time (replace with your actual loading logic)
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []);
  
      return (
        <div>
          {isLoading ? (
            <WrappedComponent />
) : (
 <LoginScreen />
 )}
        </div>
      );
    };
  }
  