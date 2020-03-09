import DogApi from './DogApi';

(function(){
    const dogApi = new DogApi();
    
    // global functions
    function appendGallery(data, container) {
        const urlArray = data.message;
        let html = '';

        for (let src of urlArray) {
            html += `
            <div class="gallery-item">
                <canvas width="240" height="240" style="background-image:url('${src}');"></canvas>
            </div>`;
        }

        document.querySelector(container).insertAdjacentHTML('beforeend', html);
    }

    class App {
        
        constructor() {
            this.loader = document.querySelector('.gallery-loader');
        }

        searchBreed(){
            const inputField       = document.querySelector('#search-breed-input'); // input field
            const dropdownHolder   = document.querySelector('#search-bar-dropdown-holder'); // dropdown wrapper
            const dropdownBackdrop = document.querySelector('.search-bar-backdrop'); 
            const breedList        = document.querySelector('.breed-list');
            const submitBtn        = document.querySelector('#search-submit');
            let currentBreed       = [];

            //append list to the dropdown
            function generateList(breeds, container) {
                let html = '';

                for(let breed of breeds) {
                    html += `
                        <button data-breed="${breed}" class="list-group-item list-group-item-action breed-list-item"><span>${breed}</span></button>
                    `;
                }

                document.querySelector(container).innerHTML = html;
            }

            // show dropdown list
            inputField.addEventListener('focus', function(){
                dropdownHolder.classList.add('active');
            });

            // filter dropdown list
            inputField.addEventListener('keyup', function(){
                let inputFieldValue = inputField.value;
                let breedArray = Array.from(currentBreed).map( item => {
                    return item;
                } );
                let filteredBreed = breedArray.filter(breed => {
                    if(breed.indexOf(inputFieldValue.trim()) > -1) {
                        return breed;
                    }
                });
                
                if(filteredBreed.length == 0) {
                    breedList.innerHTML = `<p class="text-center font-weight-normal">Sorry "${inputFieldValue}" does not exist <i class="fa fa-frown-o font-weight-bold" aria-hidden="true"></i></p>`;
                    return;
                }

                generateList(filteredBreed, '.search-bar-dropdown .list-group');
            });

            // hide dropdown list
            dropdownBackdrop.addEventListener('click', function(){
                dropdownHolder.classList.remove('active');
            });

            // add value to the input field when clicked the button
            breedList.addEventListener('click', function(event){
                const target = event.target;
                
                if(target.classList.contains('breed-list-item')) {
                    const breed = target.dataset.breed;
                    inputField.value = breed;

                    dropdownHolder.classList.remove('active');
                }

            });

            // load images for the selected breed
            submitBtn.addEventListener('click', ()=> {
                // remove all the list before rendering the specified breed
                document.querySelector('.gallery-list').innerHTML = ''; 
                this.loader.classList.remove('hidden');
                this.loadGallery();
            });

            dogApi.getBreedsList()
            .then( data => {
                currentBreed = data.message;
                generateList(data.message, '.search-bar-dropdown .list-group');
            } )
            .catch( error => {
                console.error(error.message);
            })
        }

        loadGallery() {
            const breed = document.querySelector('#search-breed-input').value == '' ? undefined: document.querySelector('#search-breed-input').value;

            dogApi.getImages(12, breed)
            .then(images => {
                // hide loader
                this.loader.classList.add('hidden');
                appendGallery(images, '.gallery-list');
            })
           .catch(error => {
               console.error('Invalid url');
           });
        }

        loadGalleryAtTheBottom () {
            let offset = 1000;
            let atTheBottom = window.pageYOffset + window.innerHeight == document.body.offsetHeight;
            
            if(!atTheBottom) {
                return;
            }
            
            this.loader.classList.remove('hidden');

            // just adding 800ms delay to load the gallery
            setTimeout(()=> {
                this.loadGallery();
            }, 800);
            
            return;

        }

        initialize() {
            console.log('app is the app is ready');
            this.searchBreed();
            this.loadGallery();
        }

   }
   
   const app = new App();

   
    // run functions on load
    window.addEventListener('load', function() {
        app.initialize();
    });

    // run functions on window scroll
    window.addEventListener('scroll', function() {
        app.loadGalleryAtTheBottom();
    });

})();