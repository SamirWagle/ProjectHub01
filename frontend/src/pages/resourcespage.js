import React from "react";
import "./resourcespage.css";
import  Topbar  from '../component/navBar/topbar';

const ResourcesPage = () => {
    return (
        <div class='resourcepage'>
             <Topbar />
             <div>
                 <h1 id='resource_title'>Resources</h1>
                 <div class='resource_title'>
                     <h2>Name</h2>
                     <h2>Link</h2>
                     <h2>Uploaded By</h2>
                     <h2>Uploaded On</h2>
                 </div>
                 <hr id='resource_divider'/>
                 <div class='resource_listelement'>
                     <h3>Name</h3>
                     <h3>Link</h3>
                     <h3>Uploaded By</h3>
                     <h3>Uploaded On</h3>
                 </div>
             </div>
        </div>
     );
}

export default ResourcesPage
