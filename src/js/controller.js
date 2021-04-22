import icons from 'url:../img/icons.svg';
const recipeContainer = document.querySelector('.recipe');

const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////////
//spiner
const renderSpinner = function(parentEle) {
    const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
    parentEle.innerHTML = '';
    parentEle.insertAdjacentHTML('afterbegin', markup);
}

///////////////////////////////////////
// FETCHING DATA -  USING THE ASYNC AWAIT WAY
const getRecipeDataFromAPI = async function() {
        try {
            renderSpinner(recipeContainer);
            const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?');
            const data = await res.json();

            //  error / bad-request hanndling
            //  if (!res.ok) throw new Error('abolo tui.. '
            //      `${data.message}`);
            console.log(res, data);
            let { recipe } = data.data;
            recipe = {
                id: recipe.id,
                name: recipe.title,
                poster: recipe.publisher,
                ingri: recipe.ingredients,
                loc: recipe.source_url,
                photo: recipe.image_url,
                cookingTime: recipe.cooking_time,
                servings: recipe.servings,
                imageURL: recipe.image_url
            }
            console.log(recipe);
            const ingredientss = recipe.ingri;
            const markup = `
         <figure class="recipe__fig">
         <img src="${recipe.photo}" alt="${recipe.name}" class="recipe__img" />
         <h1 class="recipe__title">
           <span>${recipe.name}</span>
         </h1>
       </figure>

       <div class="recipe__details">
         <div class="recipe__info">
           <svg class="recipe__info-icon">
             <use href="${icons}#icon-clock"></use>
           </svg>
           <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
           <span class="recipe__info-text">minutes</span>
         </div>
         <div class="recipe__info">
           <svg class="recipe__info-icon">
             <use href="${icons}#icon-users"></use>
           </svg>
           <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
           <span class="recipe__info-text">servings</span>

           <div class="recipe__info-buttons">
             <button class="btn--tiny btn--increase-servings">
               <svg>
                 <use href="${icons}#icon-minus-circle"></use>
               </svg>
             </button>
             <button class="btn--tiny btn--increase-servings">
               <svg>
                 <use href="${icons}#icon-plus-circle"></use>
               </svg>
             </button>
           </div>
         </div>

         <div class="recipe__user-generated">
           <svg>
             <use href="${icons}#icon-user"></use>
           </svg>
         </div>
         <button class="btn--round">
           <svg class="">
             <use href="${icons}#icon-bookmark-fill"></use>
           </svg>
         </button>
       </div>

       <div class="recipe__ingredients">
         <h2 class="heading--2">Recipe ingredients</h2>
         <ul class="recipe__ingredient-list">
          ${ingredientss.map(ingredient=>{
              return(`
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
                </div>
              </li>
              `);
            }).join('')}
         </ul>
       </div>

       <div class="recipe__directions">
         <h2 class="heading--2">How to cook it</h2>
         <p class="recipe__directions-text">
           This recipe was carefully designed and tested by
           <span class="recipe__publisher">${recipe.poster}</span>. Please check out
           directions at their website.
         </p>
         <a
           class="btn--small recipe__btn"
           href="${recipe.loc}"
           target="_blank"
         >
           <span>Directions</span>
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
         </a>
       </div>
         `;
         console.log(recipe.ingri);
         recipeContainer.innerHTML = ' ';
         recipeContainer.insertAdjacentHTML('afterbegin', markup);
     } catch (error) {
         console.log(error);
     }
 };
 getRecipeDataFromAPI();