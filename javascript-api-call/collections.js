let xhr = new XMLHttpRequest();  // fetching records from the api in javascript here
xhr.open("GET" , "https://api.vic.gov.au:443/museumvictoria/v1.0/collections/articles");
xhr.setRequestHeader('apikey','163ed491-51f4-4d8b-b531-547584af3cd4'); // using the api key

let recordsData;

// Getting records one by one and displaying in html

xhr.onload = async function(){
    if(xhr.readyState == 4 && xhr.status == 200 ){
            let data= await JSON.parse(xhr.responseText);
            console.log(data);
            recordsData = data;
            document.getElementById('loader').style.display='None';
            data.forEach((element,i) => {
                if(element.media.length === 0){
                    // do nothing
                }else{
                    let li=document.createElement("li");
                    li.setAttribute("class",'collection');
                    li.setAttribute("style","margin-bottom: 40px;");
                    let h3=document.createElement("h3");
                    h3.setAttribute("class",'collection-title');
                    h3.setAttribute("style","margin-bottom: 20px;");
                    let anchor=document.createElement("a");
                    let text_a = document.createTextNode(element.title); 
                    anchor.setAttribute("href",`./collection-details.html?id=${i}`);
                    anchor.setAttribute("style","color: #1ad9ac;");
                    anchor.appendChild(text_a);
                    h3.appendChild(anchor);
                    let anchor2=document.createElement("a");
                    anchor2.setAttribute("href",`./collection-details.html?id=${i}`);
                    anchor2.setAttribute("class","objectlink")
                    let image = document.createElement('img');
                    image.setAttribute("style","width: 850px !important; height: 200px !important;")
                    image.setAttribute("src",element.media[0].large.uri);
                    anchor2.appendChild(image)
                    li.appendChild(h3);
                    li.appendChild(anchor2);
                    document.getElementById('list_of_collections').appendChild(li);
                }
            });
        }        
    }

xhr.send()


const searchFunction= ()=>{
    // e.preventDefault();
    let searchTxt = document.getElementById('searchTxt').value;
    document.getElementById('list_of_collections').innerHTML = "";
    recordsData.forEach((element,i) => {
                let searchString = element.title.toLowerCase();
                searchTxt = searchTxt.toLowerCase(); 
                let result = searchString.search(searchTxt);
                
                if(element.media.length === 0 || result < 0){
                    // do nothing
                }else{
                    let li=document.createElement("li");
                    li.setAttribute("class",'collection');
                    li.setAttribute("style","margin-bottom: 40px;");
                    let h3=document.createElement("h3");
                    h3.setAttribute("class",'collection-title');
                    h3.setAttribute("style","margin-bottom: 20px;");
                    let anchor=document.createElement("a");
                    let text_a = document.createTextNode(element.title); 
                    anchor.setAttribute("href",`./collection-details.html?id=${i}`);
                    anchor.setAttribute("style","color: #1ad9ac;");
                    anchor.appendChild(text_a);
                    h3.appendChild(anchor);
                    let anchor2=document.createElement("a");
                    anchor2.setAttribute("href",`./collection-details.html?id=${i}`);
                    anchor2.setAttribute("class","objectlink")
                    let image = document.createElement('img');
                    image.setAttribute("style","width: 650px !important; height: 200px !important;")
                    image.setAttribute("src",element.media[0].large.uri);
                    anchor2.appendChild(image)
                    li.appendChild(h3);
                    li.appendChild(anchor2);
                    document.getElementById('list_of_collections').appendChild(li);
                }
            });
    
}

const reloadFunction= ()=>{
    window.location.reload();
}