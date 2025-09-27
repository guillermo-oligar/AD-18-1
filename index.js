const endPoint = "https://reqres.in/api/unknown";
const apiKey = "reqres-free-v1";
const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

async function fetchColorsList(){
  try{
  //PETICION  
    const response = await fetch(endPoint, {headers: {"x-api-key": apiKey}
  })
  //CONVERTIR PETICION
    const data = await response.json();
    localStorage.setItem("ColorsList",JSON.stringify(data.data)); //data es el objeto completo, mientras que data.data selecciona el array 'data' con los colores.
    //console.log(data.data) para verificar que es el array de colores.
    data.data.forEach(addItem);
  
  } catch(error){
  console.log(error)
}
} 

function loadColorsFromStorage() {
  const storedColors = localStorage.getItem("ColorsList");
  if(storedColors){
    const colorsArry = JSON.parse(storedColors);
    colorsArry.forEach(addItem)
  }
}


const storedColors = localStorage.getItem("ColorsList");
if(storedColors){
  loadColorsFromStorage();
} else {
  fetchColorsList();
}
 

