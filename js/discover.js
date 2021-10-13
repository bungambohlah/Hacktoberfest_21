const API_KEY = "f985a3ae5df8738bf04a55864c33128c";
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=`
const genreList  = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const genre_ul = document.querySelector('.genre-list')
console.dir(genre_ul)
const genre_btns = document.querySelectorAll('.genre-btns')

const genreMaker = (gen_name, gen_id)=>{
    const li  = document.createElement('li')
    li.classList.add('genre-btns')
    li.setAttribute('id', `genID:${gen_id}`)
    li.innerText = gen_name;
    genre_ul.append(li)
}

genreList.forEach(item => {
    const name = item.name;
    const id = item.id;
    genreMaker(name, id)
})

genre_ul.addEventListener('click',(e)=>{
    var selectedGenre = []
    e.target.classList.toggle('active-c')
    for(var i = 3; i< genre_ul.childNodes.length; i++)
    {
        if(genre_ul.childNodes[i].classList.contains('active-c'))
            selectedGenre.push(genre_ul.childNodes[i].id.slice(6))
    }
    console.log(selectedGenre)
    displayMovie(selectedGenre)
})

let movieList=document.getElementById("suggested-mv-list");

const displayMovie = async(genre)=>{
    movieList.innerHTML='';
    var gen= genre.toString()
    const res = await axios.get(BASE_URL+gen+'&page=1')
    console.log(res);
    let mv_list=res.data.results;
    //console.log(mv_list);
    if(mv_list.length==0){
        let no_res=document.createElement("div");
        let mv_img=document.createElement("img");
        let no_mv=document.createElement("div");
        mv_img.style.width="400px";
        mv_img.style.display="block";
        mv_img.style.paddingTop="40px";
        mv_img.style.marginLeft='auto';
        mv_img.style.marginRight='auto';
        mv_img.src=`./images/EmptyFolder.png`;
        no_mv.innerHTML="No movies available!";
        no_mv.style.color='white';
        no_mv.style.textAlign='center';
        no_res.appendChild(mv_img);
        no_res.appendChild(no_mv);
        movieList.appendChild(no_res);
    }
    else{
        for(let i=0;i<mv_list.length;i++){
            let mv_cont=document.createElement("div");
            mv_cont.classList.add("col-lg-3");
            mv_cont.classList.add("col-sm-6");
            mv_cont.classList.add("col-12");

            let mvcard=document.createElement("div");
            mvcard.classList.add("card");
            mvcard.classList.add("border-0");
            mvcard.classList.add("mb-2");
            mvcard.classList.add("tv-card");

            let mv_img=document.createElement("img");
            mv_img.classList.add("card-img-top");
            mv_img.classList.add("border-0");
            if(mv_list[i].poster_path){
                mv_img.src=`https://image.tmdb.org/t/p/w400/${mv_list[i].poster_path}`;
            }
            else{
                mv_img.src="./images/cast-placefiller.jpg";
            }

            let mv_name=document.createElement("div");
            mv_name.classList.add("card-body");
            
            let mv_name_title=document.createElement("h5");
            mv_name_title.innerHTML=mv_list[i].original_title;
            mv_name_title.classList.add("card-title");
            mv_name_title.style.color="white";

            mv_name.appendChild(mv_name_title);

            mvcard.appendChild(mv_img);
            mvcard.appendChild(mv_name);

            mv_cont.appendChild(mvcard);

            movieList.appendChild(mv_cont);
        }
    }
}