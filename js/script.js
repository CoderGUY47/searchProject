let allPost = document.querySelector(".allPost");
let tname = document.querySelector(".tname");
let tasks = document.querySelector(".tasks");
let postBtn = document.querySelector(".postBtn");
let updateBtn = document.querySelector(".updateBtn");
let error = document.querySelector(".error");
let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
let resetSearchBtn = document.querySelector(".reset-search-btn");

let arr = [];
let indexStore;
searchBtn.addEventListener("click", searchPosts);
resetSearchBtn.addEventListener("click", resetSearch);
function searchPosts() {
    let searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === "") {
        allPost.innerHTML = "";
        display(arr);
        return;
    }

    let filteredTasks = arr.filter(item => 
        item.tasks.toLowerCase().includes(searchTerm) || item.name.toLowerCase().includes(searchTerm)
    );

    allPost.innerHTML = "";
    display(filteredTasks);
}

// reset search for all posts
function resetSearch() {
    searchInput.value = ""; // clear search input
    allPost.innerHTML = ""; // clear current display
    display(arr); // show all posts
}

// add search on Enter key
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchPosts();
    }
});

postBtn.addEventListener("click", function() {
    error.innerHTML = "";
    
    if (!tname.value && !tasks.value) {
        error.innerHTML = "<div class='alert alert-danger'>Please fill in both fields.</div>";
        return;
    }
    
    if (!tname.value) {
        error.innerHTML = "<div class='alert alert-danger'>Please enter a nick name.</div>";
        return;
    }
    
    if (!tasks.value) {
        error.innerHTML = "<div class='alert alert-danger'>Please enter task details.</div>";
        return;
    }
    
    arr.push({
        name: tname.value,
        tasks: tasks.value 
    });

    tname.value = "";
    tasks.value = "";
    error.innerHTML = "";
    allPost.innerHTML = "";
    display();
});

updateBtn.addEventListener("click", function() {
    arr[indexStore].name = tname.value;
    arr[indexStore].tasks = tasks.value;

    allPost.innerHTML = "";
    display();
    
    postBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    
    tname.value = "";
    tasks.value = "";
});
function display(tasksToDisplay = arr) {
    allPost.innerHTML = "";

    tasksToDisplay.forEach((item, index) => {
        allPost.innerHTML += `
        <div class="card task-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="userName">
                        <i class="fa-sharp-duotone fa-solid fa-certificate"></i>
                        <h5 class="card-title mb-0">@${item.name}</h5>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-sm btn-outline-primary me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            </svg>
                        </button>                        
                        <button class="btn btn-sm btn-outline-primary edt me-2">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
                <p class="card-text">${item.tasks}</p>
                <div class="task-interactions mt-3 d-flex justify-content-between align-items-center border-top pt-2">
                    <div class="interaction-icons d-flex align-items-center" style="column-gap: 111px; padding: 0 !important;">
                        <div class="love-action me-3">
                            <i class="far fa-heart me-1"></i>
                            <span class="love-count">0</span>
                        </div>
                        <div class="message-action me-3">
                            <i class="far fa-comment me-1"></i>
                            <span class="message-count">0</span>
                        </div>
                        <div class="share-action">
                            <i class="fas fa-share-alt"></i>
                            <span class="share-count">0</span>
                        </div>
                        <button class="btn btn-sm btn-outline-danger dlt me-2">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    attachEventListeners(tasksToDisplay);
}

function attachEventListeners(currentTasks) {
    document.querySelectorAll('.dlt').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let originalIndex = arr.findIndex(task => 
                task.name === currentTasks[index].name && 
                task.tasks === currentTasks[index].tasks
            );
            
            arr.splice(originalIndex, 1);
            allPost.innerHTML = "";
            display();
        });
    });

    document.querySelectorAll('.edt').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let originalIndex = arr.findIndex(task => 
                task.name === currentTasks[index].name && 
                task.tasks === currentTasks[index].tasks
            );
            
            tname.value = currentTasks[index].name;
            tasks.value = currentTasks[index].tasks;
            
            updateBtn.style.display = "inline-block";
            postBtn.style.display = "none";
            
            indexStore = originalIndex;
        });
    });
}