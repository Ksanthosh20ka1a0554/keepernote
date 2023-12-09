import React from "react";



function Footer(){
    const date = new Date();
    const year = date.getFullYear();
    return(
        <footer>
            <p>Copyright © {year} Santhosh-Web developer</p>
        </footer>
    );
}

export default Footer;