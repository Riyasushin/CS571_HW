// This is where your JS goes!

fetch('https://cs571.org/rest/s25/ice/pizza', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId() // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);

    console.log("The 5-star reviews are ");
    fiveStarsReviews = data.reviews.filter( review => {
        return parseInt(review.rating) >= 5;
    }).map(review => review.txt)
    console.log( fiveStarsReviews )

    console.log(
        data.recipe.map(instance => instance.split(":")[0]) // more like java
    )

    console.log(
        Object.keys(data.ingredients)
    )

    console.log("Is there some instruction to cook?");

    console.log(
        // data.recipe.some(inst => inst.toLowerCase().includes("bake"));
        data.recipe.some(inst => inst.toLowerCase().includes("bake"))
    )

    console.log("What are the unique ingredient units");
    console.log(
        Object.keys(data.ingredients).reduce( (prev, curr) => {
            let curObj = data.ingredients[curr];
            let curUnit = curObj.unit;
            if (!curUnit) {
                return prev;
            }
            if (prev.includes(curUnit)) {
                return prev;
            }

            prev.push(curUnit);
            return prev;
        }, [])
    )




})
.catch(err => {
    alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
})