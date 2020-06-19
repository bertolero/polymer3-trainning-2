export class Contact {
	constructor(
		private _firstName: string = '',
		private _lastName: string = '',
		private _firstAddress: string = '',
		private _secondAddress: string = '',
		private _phoneNumber: string = '',
		private _city: string = '',
		private _state: string = '',
		private _zipcode: string = '',
		private _category: string = '',
		private _favorites: boolean = false
	) {}

	addValueOrIgnore(fieldName: string, value: any) {
		switch (fieldName) {
			case 'first_name':
				this._firstName = value;
				break;
			case 'last_name':
				this._lastName = value;
				break;
			case 'address_1':
				this._firstAddress = value;
				break;
			case 'address_2':
				this._secondAddress = value;
				break;
			case 'phone_number':
				this._phoneNumber = value;
				break;
			case 'city':
			case 'state':
			case 'zipcode':
			case 'category':
				// cast necessary to avoid change noImplicitAny to false
				(<any>this)[`_${fieldName}`] = value;
				break;
			case 'favorites':
				this._favorites = 'yes' === value;
				break;
			default:
				console.error(`Field ${fieldName} not member of class Contact.`);
		}
	}

	get firstName(): string {
		return this._firstName;
	}

	get lastName(): string {
		return this._lastName;
	}

	get firstAddress(): string {
		return this._firstAddress;
	}

	get secondAddress(): string {
		return this._secondAddress;
	}

	get phoneNumber(): string {
		return this._phoneNumber;
	}

	get city(): string {
		return this._city;
	}

	get state(): string {
		return this._state;
	}

	get zipcode(): string {
		return this._zipcode;
	}

	get category(): string {
		return this._category;
	}

	get favorites(): boolean {
		return this._favorites;
	}
}
