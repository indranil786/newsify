import React from 'react'
const Spinner= (props)=>{
    
        return (
            <div className="spinner" style={{width:'100%',margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_uwR49r.json"  background="transparent"  speed="3"  style={{width: props.width, height: props.height}}  loop  autoplay></lottie-player></div>
        )
    
}
export default Spinner;


