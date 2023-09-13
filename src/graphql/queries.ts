import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
	query CountriesQuery {
		countries {
			name
			code
			currency
			continent {
				name
				code
			}
		}
	}
`;
