import React from 'react'

export const Header = ({title}) => {
  return (
    <header>
        <div className="container">
            <h1>{title}</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Shop</a></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

