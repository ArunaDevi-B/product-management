
const Nav = () => {
  return (
     <div style={styles.navContainer}>
      <img 
        src="../../public/favicon.svg" 
        alt="avatar" 
        style={styles.avatar}
      />
      <h1 style={styles.heading}>Welcome!!!</h1>
    </div>
  )
}
const styles = {
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: '#f8f9fa'
    },
    avatar: {
      borderRadius: '50%',
      marginRight: '10px',
      height: "30px",
      width: '30px',
      backgroundColor: 'black'
    },
    heading: {
      margin: 0,
      fontSize: '24px'
    }
  }
export default Nav