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
    
        searchBreed(){
            const inputField       = document.querySelector('#search-breed-input'); // input field
            const dropdownHolder   = document.querySelector('#search-bar-dropdown-holder'); // dropdown wrapper
            const dropdownBackdrop = document.querySelector('.search-bar-backdrop'); 


            // show dropdown list
            inputField.addEventListener('focus', function(){
                dropdownHolder.classList.add('active');
            });

            // hide dropdown list
            dropdownBackdrop.addEventListener('click', function(){
                dropdownHolder.classList.remove('active');
            });
        }
        loadGallery() {

            dogApi.getImages(12)
            .then(images => {
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

            this.loadGallery();
            
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