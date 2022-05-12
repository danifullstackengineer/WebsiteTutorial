**_JSDoc is only for better understanding of code._**
**_It does not actually work._**

## Notation:

### @same @field

_Means the field below will be of the same type/structure as the @field_

#### Example

> address: string --- but it should be implemented as (Street, Flat number, Apartment number)<br>
> @same @paid<br>
> second_address: string<br>
> Then second_address should be of the same form (Street, Flat number, Apartment number)

### @readonly

_Means the field is not to be changed after it's assignment_

### @requires \_field @value @result

_Means that in order for the field bellow to have @result value, the \_field must have a @value value_

#### Example

> paid: boolean (assume is true);<br>
> @requires \_paid @true @true<br>
> dispatched: boolean;<br>
> Then dispatched will ONLY be true when paid is true.<br>
> But if paid is true, this does not imply that dispatched is also true.

### @noclient

_Means that the object should NOT be passed to the client in under any circumstance._

#### Example

> @noclient<br>
> password: string
> Do NOT send this object over to the client. Only keep it on the server side.

### @defaults @value

_Means that the object will have this value at initialization unless otherwise modified_

#### Example

> @default @false<br>
> verified: boolean<br>
> If no value for verified was provided, verified should be initialized as false.<br>
> Else it should be initialized as the value provided.


##### Custom types
> @new_Date => new Date() <br>
> @false => false <br>
> @[] => [] <br>
