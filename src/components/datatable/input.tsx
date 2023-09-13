import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type SearchInputProps = {
	handleClick: () => void;
	loading: boolean;
};

export default function SearchInput({
	handleClick,
	loading,
}: SearchInputProps) {
	return (
		<div className="flex items-center py-4">
			<Input className="w-80" placeholder="Search" />
			<Button
				className="ml-5"
				onClick={handleClick}
				disabled={loading}
			>
				Search
			</Button>
		</div>
	);
}
