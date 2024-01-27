import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import CMS_PATH from '../components/CMS_PATH';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [ aboutData, setAboutData ] = useState([])
  const [ contactData, setContactData ] = useState([])


  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(
        `${CMS_PATH}/wp-json/wp/v2/pages/?slug=about`,
        );
        const dataJSON = [result.data];
        setAboutData(dataJSON[0]);
    };
    fetchData();
    }, []);

   

  return (
    <GlobalContext.Provider value={{ aboutData, setAboutData, contactData, setContactData }}>
      {children}
    </GlobalContext.Provider>
  );
};
