  const siteNavigationDiv = document.getElementById("site-navigation");


let sites = {
    "intervle": {
        title: "Intervle",
        thumbnail: "imgs/intervle_thumb.png",
        href: "https://intervle.net",
        description: "Daily ear training game.",
        published: "May 2026"
    },
    "scrolling-distance": {
        title: "ScrollingDistance",
        thumbnail: "",
        href: "https://scrollingdistance.com",
        description: "Calculator to see how far your reels have traveled (vertically).",
        published: "August 2026"
    },
    "your-lifetime-ago": {
        title: "YourLifetimeAgo",
        thumbnail: "",
        href: "https://yourlifetimeago.com",
        description: "See what happened one lifetime before you were born.",
        published: "August 2026"
    }
}



for(const [title, obj] of Object.entries(sites)){
    siteNavigationDiv.appendChild(linkCard(obj))
}



function linkCard(obj){

    let a = document.createElement("a");
    a.href = obj.href;

    let container = document.createElement("div")
    container.style.display = "flex";
    a.classList.add("project-card", "blank-anchor");

    let containerLeft = document.createElement("div");
    let containerRight = document.createElement("div");

    containerLeft.style.border="none";
    containerLeft.style.background="transparent";
    containerRight.style.border="none";
    containerRight.style.background="transparent";

    containerRight.classList.add("sub-container");

    containerRight.style.flexGrow = 1;


    let img = document.createElement("img");
    img.style.height="8vh";
    img.style.aspectRatio="1/1";
    img.src= obj.thumbnail


    let title = document.createElement("span");
    title.innerText = obj.title
    // title.style.fontWeight = "bold";
    title.style.margin = "2px";
    title.style.fontSize = "larger";

    let date = document.createElement("span");
    date.innerText = obj.published
    // date.style.fontWeight = "bold";
    date.style.float = "right";
    date.style.margin = "2px";

    let desc = document.createElement("p");
    desc.fontSize = "large";
    desc.innerText = obj.description;
    desc.style.color="#898989";


    container.appendChild(containerLeft);
    container.appendChild(containerRight);

    containerLeft.appendChild(img);
    containerRight.appendChild(title);
    containerRight.appendChild(date);
    containerRight.appendChild(desc);

    a.appendChild(container)

    return a
}
