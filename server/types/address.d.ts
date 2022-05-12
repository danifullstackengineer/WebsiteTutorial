// The type definition of an address.
interface IAddress {
    // the country the user has selected
    country: string;
    // the first name on the address
    first_name: string;
    // the second name on the address
    last_name: string;
    // the address the user has selected(this includes street, flat number, apt number)
    address: string;
    // the postal code on the address
    postal_code: string;
    // the city on the address
    city: string;
    // the phone number on the address
    phone_number: string;
}
interface IDeliveryAddress extends IAddress {
    // the second address on the address
    /** @same @address */
    second_address: string;
    tax_id: string;
    second_phone_number: string;
}

export {IDeliveryAddress, IAddress};
