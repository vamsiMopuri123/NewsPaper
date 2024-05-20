
const apiKey='e8f110beeba148b9915d71381f1ed517'
const blogContainer=document.getElementById("blog-container")
const searchField=document.getElementById('search-input')
const searchButton=document.getElementById("search-button")

searchButton.addEventListener("click",async()=>{
    const query = searchField.value.trim();
    if(query!==""){
        try{
            const articles=await fetchNewQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query",error)
        }
    }
})

const fetchNewQuery=async(query)=>{
    try {
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=50&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data=await response.json();
        console.log(response.data);
        return data.articles;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const randomData = async () => {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${apiKey}`;
        const response = await axios.get(url);
        console.log(response.data);
        return response.data.articles;
    } catch (error) {
        console.log(error);
        return [];
    }
}


function displayBlogs(articles){
    blogContainer.innerHTML=""
    articles.forEach(artical => {
        const blogCard=document.createElement("div")
        blogCard.classList.add("blog-card")
        const img = document.createElement("img");
        img.src = artical.urlToImage;
        img.alt = artical.title;
        const title=document.createElement("h2")
        const truncatedTitle=artical.title.length>30 ? artical.title.slice(0,30)+"....":artical.title;
        title.textContent=truncatedTitle
        const description=document.createElement("p")
       // const truncatedData=artical.description.length>120 ? artical.description.slice(0,120)+"....":artical.description;
        description.textContent=artical.description
        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click",()=>{
            window.open(artical.url)
        })
        blogContainer.appendChild(blogCard)
    });
}

(async()=>{
    try{
        const articles=await randomData();
        displayBlogs(articles);
    }catch(error){
        console.log(error)
        
    }
})();