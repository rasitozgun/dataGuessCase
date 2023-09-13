"use client";

import * as React from "react";

import { DataTableProps, Country } from "@/components/types";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function DataTable({
	data,
	loading,
	handleRowClick,
	selectedRow,
}: DataTableProps) {
	return (
		<>
			<div className="rounded-md border text-center">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center">
								Code
							</TableHead>
							<TableHead className="text-center">
								Name
							</TableHead>
							<TableHead className="text-center">
								Continent | Code
							</TableHead>
							<TableHead className="text-center">
								Currency
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow>
								<TableCell colSpan={4}>
									Loading...
								</TableCell>
							</TableRow>
						)}

						{!data && !loading && (
							<TableRow>
								<TableCell colSpan={4}>
									No data found.
								</TableCell>
							</TableRow>
						)}
						{data?.map((country: Country) => (
							<TableRow
								key={country.code}
								className={`cursor-pointer ${
									selectedRow === country.code
										? "bg-destructive"
										: ""
								}`}
								onClick={() =>
									handleRowClick(country.code)
								}
							>
								<TableCell>{country.code}</TableCell>
								<TableCell>{country.name}</TableCell>
								<TableCell>
									{country.continent.name} |{" "}
									{country.continent.code}
								</TableCell>
								<TableCell>{country.currency}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
