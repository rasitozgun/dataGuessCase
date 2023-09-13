export interface Countries {
	countries: Country[];
}

export interface Country {
	__typename: string;
	name: string;
	code: string;
	currency: string;
	continent: Continent;
}

export interface Continent {
	__typename: string;
	name: string;
	code: string;
}

export type DataTableProps = {
	data: Country[] | undefined;
	handleRowClick: (countryCode: string) => void;
	loading: boolean;
	error: any;
	selectedRow: string | null;
};
