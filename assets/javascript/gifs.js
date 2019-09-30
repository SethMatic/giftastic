let buttons = ['cats', 'dogs', 'lions','test'];

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

$('#submit-button').on('click',function (event) {
    event.preventDefault();

const value = $('#search').val();

buttons.push(value);

renderButtons();

console.log('Value', value);

});


