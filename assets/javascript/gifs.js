let buttons = ['cats', 'dogs', 'lions','test'];

const apiKey = 'YcXH84Jw7UjWmn3aixZ7TS9mhScDELxP';
const endPoint = 'http://api.giphy.com/v1/gifs/search?apikey=YcXH84Jw7UjWmn3aixZ7TS9mhScDELxP';

function loadButtons() {
    const listButtons = JSON.parse( localStorage.getItem('buttons') );

    buttons = listButtons;
}

function renderButtons() {
    $('.recent-search').empty();

    for (let i = 0; i < buttons.length; i++) {
        const buttonName = buttons[i];


        const button = `
        <div class="wrap-buttons">
            <button 
                class="btn btn-search" 
                data-name="${buttonName}"
            >${buttonName}</button>
            <button
                data-name="${buttonName}"
                data-index="${i}"
                class="btn btn-delete fas fa-times"
            ></button>
        </div>
        
        `;

        $('.recent-search').append(button);
    }

localStorage.setItem('buttons',JSON.stringify(buttons));


}
loadButtons();
renderButtons();





function removeButton(){

    const buttonIndex = $(this).attr('data-index');

    buttons.splice(buttonIndex,1);

    renderButtons();

}

function addButton(value){
    buttons.push(value);
    renderButtons();
}



function renderGiphys(giphys){
    $('.giphy-content').empty();

    for(let i = 0; i < giphys.length; i++){
        const giphy = giphys[i];  

        
    
        const giphyTemplate = createTemplate(giphy);

  $('.giphy-content').append(giphyTemplate);
    }


}

function createTemplate(giphy){
    const images = giphy.images;
    const template =` 
    <div class="giphy">
        <i class="far fa-star favorite" data-id="${giphy.id}" data-star="false">
        </i>
        <div class="giphy-image">
             <img 
                src="${images.original_still.url}"
                data-still="${images.original_still.url}"
                data-animate="${images.original.url}" data-state="still">
            <i class="fa fa-play img-play"></i>
</div>
<div class="giphy-info">
    <p>Rating: g</p>
    <p>Posted A Year Ago</p>
</div>

<div class="giphy-footer" data-link="${giphy.embed_url}"> 
    <p>Copy Link <i class="fa fa-link"></i></p>
</div>
</div> 
`;

return template;





}




function getGiphy(value) {

    const url = endPoint + '&q=' + value;
    
    $.ajax({url})

    .then(function(response) {
        const giphys = response.data;

        renderGiphys(giphys);
        console.log('Giphys:',giphys)
    })
    .catch(function(error) {
        console.log('Error:',error);

    });
    
}



function searchGiphy(event){
    event.preventDefault();
    const value = $('#search').val();
    addButton(value);
    getGiphy(value);

    



}



///events
$(document).on('click','.btn-delete',removeButton);
$('#submit-button').on('click',searchGiphy);
    



