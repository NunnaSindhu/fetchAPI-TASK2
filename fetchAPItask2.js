//select the target element to display the data
const result = document.querySelector(".result");
result.style.display ="none";
//for fetching data create getData function
const url = "https://www.balldontlie.io/api/v1/players";
const getData = async () => {
  try {
    const playersData = await fetch(url);
    const response = await playersData.json();
    // console.log(response);
    return response;
  } catch (error) {
    result.innerHTML = error;
  }
};

//logic for search functionality
let searchBox=document.querySelector(".search-box");
searchBox.addEventListener("keyup",async function(){
  let enteredText=searchBox.value;
  let filteredPlayers=[];
  const playersData =await getData();
  console.log(playersData);
  console.log(enteredText);
  if(enteredText!="")
   //write the logic to filter the data
   filteredPlayers=playersData.data.filter((players)=>(players.first_name.toLocaleLowerCase().includes(enteredText.toLocaleLowerCase())));
   console.log(filteredPlayers);
   displayFilteredData(filteredPlayers);
});

//Logic to display filtered data
function displayFilteredData(players){
    players.forEach((player) => {       
        result.innerHTML += `
            <div class="table-container">
            <table class="table table-striped">            
        <tbody class="table-content">
          <tr>
            <td>${player.id}</td>
            <td>${player.first_name}</td>
            <td>${player.last_name}</td>
            <td>${player.position}</td>
            <td>${player.team.full_name}</td>
            <td>${player.team.city}</td>
            <td>${player.team.conference}</td>
            <td>${player.team.division}</td>        
          </tr>      
        </tbody>
      </table>
            </div>
            `;
      });
}

// create displayData function for displaying data
async function displayData(player) {
  result.style.display ="inline";
  const playersData = await getData();
  playersData.data.forEach((player) => {
    // console.log(player.first_name);
    result.innerHTML += `
        <div class="table-container">
        <table class="table table-striped">            
    <tbody class="table-content">
      <tr>
        <td>${player.id}</td>
        <td>${player.first_name}</td>
        <td>${player.last_name}</td>
        <td>${player.position}</td>
        <td>${player.team.full_name}</td>
        <td>${player.team.city}</td>
        <td>${player.team.conference}</td>
        <td>${player.team.division}</td>        
      </tr>      
    </tbody>
  </table>
        </div>
        `;
  });
}
