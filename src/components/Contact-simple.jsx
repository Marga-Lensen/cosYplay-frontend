import { useNavigate, Link } from "react-router-dom";
import React from "react";

// Kontakt-Formular wird hier noch ergänzt

const Contact = () => {
    const navigate = useNavigate();
    
    return (
        <div>
        <h1>Kontakt</h1>
        <div className="contact-container">
        <h4>Bei Fragen oder Anregungen kannst du uns gerne kontaktieren unter:
        </h4>
            {/* <p>Email: cosyplay25@gmail.com</p> */}
            <p><a href="mailto:cosyplay25@gmail.com">cosyplay25@gmail.com</a></p>
            <h4>Oder gerne auch über:</h4>
            <p><a href="https://github.com/Marga-Lensen" target="blank">LinkedIn Marga Lensen</a></p>
            <p><a href="https://github.com/Manfred-Berginski" target="blank">LinkedIn Manfred Berginski</a></p>
            <p><a href="https://wonderl.ink/@dorispasicstudio" target="blank">WonderLink Doris Pasic</a></p>
        </div>
        </div>
       
    );
};

export default Contact;