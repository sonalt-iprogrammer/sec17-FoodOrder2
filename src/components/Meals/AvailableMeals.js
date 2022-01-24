import { useEffect, useState } from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] =  useState(true);
  const [hasError,setHasError] =  useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://foodorder-5f947-default-rtdb.firebaseio.com/meals.json',
      )
          
      if(!response.ok){
        throw new Error('Something went wrong!!!');
      }

      
      const responseData = await response.json();
     console.log(response)
  
      const loadedMeals = []
      for (const key in responseData) {
        console.log(key)
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      console.log(loadedMeals)
      setMeals(loadedMeals)
      setIsLoading(false);
    }

    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setHasError(error.message);
    });
  }, [])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        {hasError}
        {isLoading?<p>Loading...Please Wait..</p>:<ul>{mealsList}</ul>}
      </Card>
    </section>
  )
}

export default AvailableMeals
