  const postNavigationDiv = document.getElementById("post-navigation");
    // let posts = ["invertible.html"]; // 3d render, nn lib, tof camera, research, optimalpv-rl

    /*
    extend learn2mask to see quality over data of different entropy
    */

    let posts = {
        "invertible": {
            title: "Implicitly Trained Pseudo-Invertibility in Dense Nets",
            href: "posts/invertible.html",
            description: "A simple approach to signal reconstruction using only forward training.",
            published: "April 2026"
        }
    }


    for(const [title, obj] of Object.entries(posts)){
        postNavigationDiv.appendChild(linkCard(obj))
    }



    function linkCard(obj){

        let a = document.createElement("a");
        a.href = obj.href;

        let container = document.createElement("div")
        a.classList.add("project-card", "blank-anchor");


        let title = document.createElement("span");
        title.innerText = obj.title
        title.style.fontWeight = "bold";
        title.style.margin = "2px";
        title.style.fontSize = "large";

        let date = document.createElement("span");
        date.innerText = obj.published
        // date.style.fontWeight = "bold";
        date.style.float = "right";
        date.style.margin = "2px";

        let desc = document.createElement("p");
        desc.innerText = obj.description;

        container.appendChild(title);
        container.appendChild(date);
        container.appendChild(desc);

        a.appendChild(container)

        return a
    }