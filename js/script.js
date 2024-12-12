let allPost = document.querySelector(".allPost");
let tname = document.querySelector(".tname");
let tasks = document.querySelector(".tasks");
let postBtn = document.querySelector(".postBtn");
let updateBtn = document.querySelector(".updateBtn");
let error = document.querySelector(".error");
let arr = [];
let indexStore;

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

function display() {
    arr.forEach((item, index) => {
        allPost.innerHTML += `
        <div class="card task-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="card-title mb-0">${item.name}</h5>
                    <div class="task-actions">
                        <button class="btn btn-sm btn-outline-primary edt me-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger dlt">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="card-text">${item.tasks}</p>
                
                <div class="task-interactions mt-3 d-flex justify-content-between align-items-center border-top pt-2">
                    <div class="interaction-icons d-flex align-items-center">
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
                    </div>
                    <div class="additional-actions">
                        <button class="btn btn-sm btn-outline-secondary me-2 edit-task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    document.querySelectorAll('.dlt').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            arr.splice(index, 1);
            allPost.innerHTML = "";
            display();
        });
    });

    document.querySelectorAll('.edt').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            tname.value = arr[index].name;
            tasks.value = arr[index].tasks;
            
            updateBtn.style.display = "inline-block";
            postBtn.style.display = "none";
            
            indexStore = index;
        });
    });

}
