import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/graphql/queries";

import { DataTable } from "@/components/datatable/data-table";
import SearchInput from "@/components/datatable/input";
import { Button } from "@/components/ui/button";
import { Country } from "@/components/types";

import { useEffect, useState } from "react";

export default function Countries() {
	const dataCountPerPage = 10;
	const [page, setPage] = useState(1);
	const { loading, error, data, client } = useQuery(GET_COUNTRIES);
	const [selectedRow, setSelectedRow] = useState<Country | null>(null);
	const [rows, setRows] = useState<Country[]>();
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (!loading) {
			const updatedRows = data?.countries || []; // Varsayılan olarak boş bir dizi atayın
			setRows(updatedRows);

			if (updatedRows.length > 10) {
				setSelectedRow(updatedRows[9]);
			} else {
				const lastIndex = updatedRows.length - 1;
				setSelectedRow(
					lastIndex >= 0 ? updatedRows[lastIndex] : null,
				);
			}
		}
	}, [data, rows]);

	console.log(search);

	const handleClick = async () => {
		const res = await client.refetchQueries({
			include: [GET_COUNTRIES],
		});

		const a = "code";

		const newRows = res[0].data.countries.filter((country: Country) =>
			country[a].toLocaleLowerCase().includes("a"),
		);
		setRows(newRows);
		setPage(1);
	};

	const handleRowClick = (country: Country) => {
		// Seçilen satırı güncelle
		setSelectedRow(selectedRow === country ? null : country);
	};

	if (error) return <p>{error.message} </p>;

	return (
		<div className="w-full bg-card p-7 shadow-xl rounded-md">
			<SearchInput
				handleClick={handleClick}
				loading={loading}
				country={selectedRow}
				search={search}
				setSearch={setSearch}
			/>
			{loading && <p>Loading...</p>}
			{!loading && (
				<>
					<DataTable
						data={
							rows &&
							rows?.slice(
								page * dataCountPerPage - dataCountPerPage,
								page * dataCountPerPage,
							)
						}
						loading={loading}
						handleRowClick={handleRowClick}
						selectedRow={selectedRow}
						error={error}
					/>
					<div className="flex items-center justify-end space-x-2 py-4">
						<p className="mx-5">Page: {page}</p>

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
									rows &&
									page * dataCountPerPage >= rows.length
								}
							>
								Next
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
