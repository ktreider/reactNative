//to ensure all places have the same structure
export class Place {
    constructor(title, imageUri, location, id) {
      this.title = title;
      this.imageUri = imageUri;
      this.address = location.address;
      this.location = { lat: location.lat, lng: location.lng }; // { lat: #, lng: # }
      this.id = id;
    }
  }