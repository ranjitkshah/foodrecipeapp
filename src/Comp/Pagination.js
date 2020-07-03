import React, { useState,useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';


 
 


function Pagination({showperpage ,onpage, total }) {
    const [counter, setcounter] = useState(1)

    useEffect(() => {
        const value= showperpage*counter;
        onpage(value-showperpage,value);
         
    }, [counter])

    const onBtnClick = type =>{
        if(type==="prev"){
            if(counter===1){
                setcounter(1)

            }
            else{
                setcounter(counter-1)
            }
        }
        if(type==="next"){
            if( Math.ceil(total/showperpage)===counter ){
                setcounter(counter)
            }
            else{
                setcounter(counter+1)
            }
        }

    }

    const btn ={
        color: "white",
        backgroundColor: "red",
        padding: "10px",
        fontSize: "14px"
    }

    

     

    return (
        <div>
            <div >
            <IconButton   onClick={()=>onBtnClick("prev")} >
        <SkipPreviousRoundedIcon style={{ fontSize: 40 }} />
      </IconButton>
             
            <label style={{fontSize:"21px"}}  > {counter} </label>
             
            <IconButton onClick={()=>onBtnClick("next")} >
        <SkipNextRoundedIcon style={{ fontSize: 40 }} />
      </IconButton>


            </div>
            
        </div>
    )
}

export default Pagination
