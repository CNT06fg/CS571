import { useEffect, useState } from "react";
import Recipe from "./Recipe";

export default function AllRecipes(props) {
    const [pizza, setPizza] = useState();
    const [pasta, setPasta] = useState();
    const [chili, setChili] = useState();

    useEffect(()=> {
        fetch("https://cs571.org/rest/s25/ice/chili", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setPizza(data);
            console.log("Received pizza; remember, it will not be set quite yet!", pizza);
        })
        fetch("https://cs571.org/rest/s25/ice/pasta", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setPasta(data);
            console.log("Received pasta; remember, it will not be set quite yet!", pasta);
        })

        fetch("https://cs571.org/rest/s25/ice/chili", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setChili(data);
            console.log("Received chili; remember, it will not be set quite yet!", chili);
        })
    }, [])

    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        <Recipe {...pizza}/>
        <Recipe {...pasta}/>
        <Recipe {...chili}/>
    </div>
}