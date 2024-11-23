/* House Finder
    Find houses (exlusively in South Dakota)
    Called "Silla" (Sophi's Villa)
*/

/*
CRUD Requirements
Database (of some sort)
Create: Create a house "listing"
Read: Read all house "listings"
Update: Update house "listings"
Delete: Delete house "listings"
*/

/*
House Properties:
Address (+ City + State + Zip)
Property Type: (House, Townhouse, Apartment, Ranch, Mansion)
Beds: 1 - 12
Baths: 1 - 5
Square Feet: 700 - 7000
Price: 50,000 - 2.3 Million
ID: (Not Inputed - Naturally Generated)
*/

class Listing {
    constructor(address, city, state, zip, propertyType, beds, baths, squareFeet, price) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.propertyType = propertyType;
        this.beds = beds;
        this.baths = baths;
        this.squareFeet = squareFeet;
        this.price = price;
    }
}

class ListingService {
    static url = 'https://674110b8d0b59228b7f221b2.mockapi.io/listings'

    static getAllListings() {
        return $.get(this.url);
    }

    static getListing(id) {
        return $.get(this.url + `/${id}`);
    }

    static createListing(listing) {
        return $.post(this.url, listing);
    }

    static updateListing(listing) {
        return $.ajax({
            url: this.url + `/${listing.id}`,
            dataType: 'json',
            data: JSON.stringify(listing),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteListing(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}
class DOMManager {
    static listings;

    static getAllListings() {
        ListingService.getAllListings().then(listings => this.render(listings));
    }

    static createListing(address, city, state, zip, propertyType, beds, baths, squareFeet, price) {
        ListingService.createListing(new Listing(address, city, state, zip, propertyType, beds, baths, squareFeet, price))
        .then(() => {
            return ListingService.getAllListings();
        })
        .then((listings) => this.render(listings));
    }

    static deleteListing(id) {
        ListingService.deleteListing(id)
        .then(() => {
            return ListingService.getAllListings();
        })
        .then((listings) => this.render(listings));
    }

    static render(listings) {
        this.listings = listings;
        $('#app').empty();
        for (let listing of listings) {
            $('#app').append(
                `<div id="${listing.id}" class="card">
                    <div class="card-header">
                        <h4>$${listing.price}</h4>
                    </div>
                    <div class="card-body text-center align-items-center">
                        <div class="card">
                            <div class="row">
                                <div class="col-12">
                                    <h5 id="address-${listing.id}">${listing.address + ", " + listing.city + ", " + listing.state + ", " + listing.zip}</h5>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-sm-3">
                                    <p id="propertyType.${listing.id}">${listing.propertyType}</p>
                                </div>
                                <div class="col-sm-3">
                                    <p id="beds.${listing.id}">${listing.beds} Beds</p>
                                </div>
                                <div class="col-sm-3">
                                    <p id="baths.${listing.id}">${listing.baths} Baths</p>
                                </div>
                                <div class="col-sm-3">
                                    <p id="squareFeet.${listing.id}">${listing.squareFeet} Sqft</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-danger"onclick="DOMManager.deleteListing('${listing.id}')">Delete Listing</button>
                    </div>
                </div>
                <br>`
            )
        }
    }
}

$('#create-new-listing').click(() => {
    DOMManager.createListing($('#new-listing-address').val(), $('#new-listing-city').val(), $('#new-listing-state').val().toUpperCase(), $('#new-listing-zip').val(), $('#new-listing-propertyType').val(), $('#new-listing-beds').val(), $('#new-listing-baths').val(), $('#new-listing-squareFeet').val(), $('#new-listing-price').val());
    $('#new-listing-address').val(''), $('#new-listing-city').val(''), $('#new-listing-state').val(''), $('#new-listing-zip').val(null), $('#new-listing-propertyType').val(''), $('#new-listing-beds').val(null), $('#new-listing-baths').val(null), $('#new-listing-squareFeet').val(null), $('#new-listing-price').val(null);
})

DOMManager.getAllListings();



//urlTesting = 'https://674110b8d0b59228b7f221b2.mockapi.io/listing/0'