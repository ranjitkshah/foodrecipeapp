import React , {useState} from 'react';
import Axios from 'axios';
import './App.css';
import Recipe from './Comp/Recipe';
import {v4 as uuidv4} from 'uuid';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './Comp/Pagination';
import Chip from '@material-ui/core/Chip';
 
const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    display: 'flex',
     
    margin: 10,

    fontSize:20,
    
    justifyContent: 'center',
    flexWrap: 'wrap',
    
  },
}),
);
 
 

function App() {

  const classes = useStyles();
  const [query, setQuery] = useState('')  
  const [recipes, setrecipes] = useState([])
  const [alert, setalert] = useState('')
  const [msg, setMsg] = useState(``)
  const [showperpage, setShowperpage] = useState(3)
  const [pagination, setpagination] = useState({
    start:0,
    end:showperpage,
  })

  const YOUR_APP_ID = `20e9a964`;

  const YOUR_APP_KEY = `26e48221cf6eeb447a7c12e8cffca37e`;

  const url=`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const getData = async () =>{

    if(query!==""){
      const result = await Axios.get(url);

      console.log(result)
      console.log(result.data.more)
      if(!result.data.more){
         setalert('No Such Recipe Exist')

      }

      console.log(result)
      setrecipes(result.data.hits)
      console.log(alert)

      setQuery(``)
    }
    else{
      setalert('Please Type Recipe Name')
    }

  }

   const onsubmit =(e)=>{
    e.preventDefault();
    getData();
    setMsg(`You Selected ${query} Recipes`);
    console.log(alert)
    toast.error( alert , {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
   
   }

   const onpage=(start,end)=>{
     setpagination({start:start,end:end})

   }

   const onchange = e=>{
     setQuery(e.target.value)
      

   }

  return (
    <div className="App">
            {alert&&<ToastContainer
            className="alert"
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
/>}
    

      <div >
        <h1>Food-Recipe App</h1>
        {msg!==""&&  <Chip
        className={classes.root}
      
        label= {msg}
         
        color="primary"
        
        
        icon={<DoneIcon fontSize="large" />}
      />}

     
   

        <form className="search-form" onSubmit={(e) => onsubmit(e)} >
          <input type="text" placeholder="Search-Recipe" onChange={onchange} autoComplete="off" value={query} >
          </input>
          <input type="submit" value="search" >
          </input>
        </form>

     

        <div className="recipes" >
          {recipes!==[]&&recipes.slice(pagination.start,pagination.end).map(recipe=>
           <Recipe key={uuidv4()} recipe={recipe}/>
           )}
        </div>

      <div>

            {recipes!==[]&&msg!==""&&<Pagination showperpage={showperpage} recipes={recipes} total={recipes.length}  onpage={onpage} />}
        </div>
      

      </div>
       
    </div>
  );
}

export default App;
