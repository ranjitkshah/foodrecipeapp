import React , {useState} from 'react'
import RecipeDetails from './RecipeDetails';

function Recipe({recipe}) {
    const [show, setShow] = useState(false)
    const {label,image,url,ingredients}= recipe.recipe;
    return (
        <div className="recipe">
            <h2> {label} </h2>
            <img src={image} alt={label} ></img>
            <form>
         <button type="submit" formAction= {url}>Click For more info.</button>
      </form>
            <button onClick={()=>setShow(!show)} >ingredients</button>
            {show && <RecipeDetails ingredients={ingredients} />}
            
        </div>
    )
}

export default Recipe
