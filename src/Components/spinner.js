import React from 'react'
const Spinner= ()=>{
    
        return (
            <div className="spinner" style={{width:'100%',margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h1>Loading...</h1>
                <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_OdNgAj.json"  background="transparent"  speed="1"  style={{width: '500px', height: '500px'}}  loop  autoplay></lottie-player>            </div>
        )
    
}
export default Spinner;


