export default class DogApi {

    constructor() {
        this.baseUrl = 'https://dog.ceo/api';
    }

    async getRandomImages(imageCount = 10){

        
        const dogApiurl =  `${this.baseUrl}/breeds/image/random/${imageCount}`;
        const response  = await fetch(dogApiurl);
        const data      = await response.json(); 
        
        if(!response.ok) {
            return Promise.reject(response);
        }
        
        return data;
        
    }
    
}