import React from "react";

function Navbar(){
    return(
        <nav className="nav">
            <a href="/" className="site-title">
                Quizle
            </a>
            <ul>
                <li>
                    <a href="/student">Student</a>
                </li>
                <li>
                    <a href="/teacher">Teacher</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;