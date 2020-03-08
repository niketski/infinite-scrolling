export default class DogApi {

    constructor() {
        this.baseUrl = 'https://dog.ceo/api';
        this.breedsUrl = `${this.baseUrl}/breeds/list`;
    }

    getImagesUrl(imageCount, breed) {
        let url = '';

        // returns the specified breed
        if(breed != undefined) {
            url = `${this.baseUrl}/breed/${breed}/images/random/${imageCount}`;
            return url;
        }

        // return random images if breed was not specified
        url = `${this.baseUrl}/breeds/image/random/${imageCount}`;
        return url;
    }

    async getImages(imageCount = 10, breed){
        let dogApiurl   = this.getImagesUrl(imageCount, breed);
        const response  = await fetch(dogApiurl);
        const data      = await response.json(); 
        
        if(!response.ok) {
            return Promise.reject(response);
        }
    
        return data;
        
    }

    async getBreedsList() {
        const response = await fetch(this.breedsUrl);
        const data     = await response.json();

        if(!response.ok) {
            return Promise.reject(data)
        }

        return data;
    }
    
}