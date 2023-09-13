import { useQuery } from "@apollo/client";
import { DataTable } from "./datatable/data-table";
import { GET_COUNTRIES } from "@/graphql/queries";
import SearchInput from "@/components/datatable/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Country } from "./types";

export default function Countries() {
	const dataCountPerPage = 10;
	const [page, setPage] = useState(1);

	const { loading, error, data, refetch } = useQuery(GET_COUNTRIES);

	const handleClick = () => {
		refetch();
		setRows(data.countries);
	};
	const [rows, setRows] = useState<Country[]>();
	const [selectedRow, setSelectedRow] = useState<string | null>(null);

	useEffect(() => {
		if (!loading) {
			setRows(data.countries);
			setSelectedRow(
				data.countries.length > 10
					? data.countries[9].code
					: data.countries[data.countries.length - 1].code,
			);
		}
	}, [data]);

	const handleRowClick = (countryCode: string) => {
		// Seçilen satırı güncelle
		setSelectedRow(countryCode);
		console.log(selectedRow);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message} </p>;

	return (
		<div className="w-full bg-card p-7 shadow-xl rounded-md">
			<SearchInput handleClick={handleClick} loading={loading} />
			<DataTable
				data={rows?.slice(
					page * dataCountPerPage - dataCountPerPage,
					page * dataCountPerPage,
				)}
				loading={loading}
				handleRowClick={handleRowClick}
				selectedRow={selectedRow}
				error={error}
			/>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(page + 1)}
						disabled={
							page * dataCountPerPage >=
							data.countries?.length
						}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
