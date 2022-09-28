const myKey = "1z6c2KhsEKJXIrs4fJ53r5xNnBzl63J6";
const limit = 10;

// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Capture the three major foci of user interaction in variables.
const submitButton = document.querySelector("#submit");
const queryField = document.querySelector("#search");
const imageHolderDiv = document.querySelector("#imageholder");

// Log the elements to confirm that the querySelectors worked.
//console.log(submitButton);
//console.log(queryField);
//console.log(imageHolderDiv);

submitButton.addEventListener("click", async (e) => {
 const topic = queryField.value;
  console.log(topic);

  const myQuery= `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=${topic}&limit=${limit}`;
  console.log(myQuery);

  const response = await fetch(myQuery);
  console.log(response);

  const json = await response.json();
  console.log(json);

  const i = getRandomInt(json.data.length);
  if(i > limit){
    i=0;
  }
  
  const imgurl = json.data[i].images.downsized.url;
   const imgwidth = json.data[i].images.downsized.width;
   const imgheight = json.data[i].images.downsized.height;
  
  console.log(imgurl);

 const imgtag = `<img src="${imgurl}" width="${imgwidth}" height="${imgheight}" />`;

  imageHolderDiv.innerHTML = imgtag + imageHolderDiv.innerHTML;
});
