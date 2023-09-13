import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Country } from "../types";

type SearchInputProps = {
	handleClick: () => void;
	loading: boolean;
	country: Country | null;
	search: string;
	setSearch: (value: string) => void;
};

export default function SearchInput({
	handleClick,
	loading,
	country,
	search,
	setSearch,
}: SearchInputProps) {
	return (
		<div className="flex items-center py-4">
			<Input
				className="w-80"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Button
				className="ml-5"
				onClick={handleClick}
				disabled={loading}
			>
				Search
			</Button>
			<div className="mx-5">Selected Country: {country?.name}</div>
		</div>
	);
}
