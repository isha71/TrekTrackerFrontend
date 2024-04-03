import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

// Get the current year dynamically
const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="rowAlignment alignCenter">
      <p>Made with <FavoriteIcon sx={{ fontSize: 13 }}/> by <a href="https://github.com/isha71" target="blank"><span className="authorName">Isha Jain</span></a> &copy; {year}</p>
    </footer>
  );
}

export default Footer;
