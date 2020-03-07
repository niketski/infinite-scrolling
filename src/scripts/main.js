import DogApi from './DogApi';

(function(){
    const dogApi = new DogApi();
    
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

        loadRandomBreeds() {

            dogApi.getRandomImages(4)
            .then(images => {

            console.log(images);

            })
           .catch(error => {
               console.log('Invalid url');
           });
        }

        initialize() {
            console.log('app is the app is ready');
            this.searchBreed();
            this.loadRandomBreeds();
        }

   }
   
   const app = new App();

   
    // run functions on load
    window.addEventListener('load', function() {
        app.initialize();

    });

})();