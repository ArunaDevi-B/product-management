import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footerContainer as React.CSSProperties}>
      <p style={styles.footerText}>© 2024 Your Company. All rights reserved.</p>
    </div>
  );
}

const styles = {
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e7e7e7',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  footerText: {
    margin: 0,
    fontSize: '14px',
    color: '#333',
  }
};


// const styles = {
//     footerContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '10px', // Adjust padding as needed
//       backgroundColor: '#f8f9fa',
//       borderTop: '1px solid #e7e7e7',
//       width: '100%',
//       minHeight: '50px', // Minimum height to prevent collapsing
//       flexGrow: 1, // Fill remaining vertical space
//     },
//     footerText: {
//       margin: 0,
//       fontSize: '14px',
//       color: '#333',
//     }
//   };

export default Footer;
