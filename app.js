showNotes();
let AddBtn = document.getElementById('add-btn');
AddBtn.addEventListener('click', function (e) {
    let AddText = document.getElementById('add-text');
    let AddTitle = document.getElementById('add-title');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObject = []
    }
    else {
    var val = {
            title : AddTitle.value,
            text : AddText.value
        }
    }
    notesObject.push(val);
    localStorage.setItem('notes', JSON.stringify(notesObject))
    AddText.value = "";
    AddTitle.value = "";
    // console.log(notesObject);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes')
    // console.log(notes)
    if (notes == null) {
        notesObject = [];
    }
    else {
        notesObject = JSON.parse(notes)
    }
    let html = ''
    notesObject.forEach(function (element, index) {
        html += `
                  <div class="col notes-cards">
                      <div class="card p-3">
                        <div class="card-body">
                          <h5 class="card-title">${index+1}. ${element.title}</h5>
                          <p class="card-text">${element.text}</p>
                          <button id="${index}" onclick="deleteNode(this.id)"  class="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
        `
    })
    let all_notes = document.getElementById("all-notes");
    if (notesObject.length != 0){
        all_notes.innerHTML = html
    }
    else(
        all_notes.innerHTML = `<P class="text-center w-100"> there are not any notes to show </p>`
    )
}

function deleteNode(index) {
    // console.log('deleteNode',index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObject = []
    }
    else {
        notesObject = JSON.parse(notes);
    }
    notesObject.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObject));
    showNotes();
}


// search box
var searchText = document.getElementById('search-text')
searchText.addEventListener('input',function(e) {
    // console.log("search",searchText.value)
    inputVal = searchText.value.toLowerCase();
    // console.log(inputVal)
    let textCards = document.getElementsByClassName('notes-cards')
    Array.from(textCards).forEach(function(e){
        let innerText = e.getElementsByTagName("p")[0].innerText.toLowerCase()
        // console.log(innerText)
        if (innerText.includes(inputVal)){
            e.style.display = "block"
        }
        else{
            e.style.display = "none"
        }
    })

})