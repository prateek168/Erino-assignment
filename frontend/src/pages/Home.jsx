import   { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get("/contacts");
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div>
      <ContactForm
        currentContact={currentContact}
        setContacts={setContacts}
        setCurrentContact={setCurrentContact}
      />
      <ContactTable
        contacts={contacts}
        setContacts={setContacts}
        setCurrentContact={setCurrentContact}
      />
    </div>
  );
};

export default Home;
