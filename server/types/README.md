**_JSDoc is only for visualization purposes._**
**_It does not actually work._**

## Notation:

### @same @field

_Means the field below will be of the same type/structure as the @field_

#### Example

> address: string --- but it should be implemented as (Street, Flat number, Apartment number)
> @same @paid
> second_address: string
> Then second_address should be of the same form (Street, Flat number, Apartment number)

### @readonly

_Means the field is not to be changed_

### @requires \_field @value @result

_Means that in order for the field bellow to have @result value, the \_field must have a @value value_

#### Example

> paid: boolean (assume is true);
> @requires _paid @true @true
> dispatched: boolean;
> Then dispatched will ONLY be true when paid is true.<br>
> But if paid is true, this does not imply that dispatched is also true.
