import React from "react";

function Navbar(){
    return(
        <nav className="nav">
            <a href="/" className="site-title">
                QuizApp
            </a>
            <ul>
                <li className="mr-4">
                    <a href="/student">All Quizzes</a>
                </li>
                <li>
                    <a href="/teacher">Create Quiz</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;