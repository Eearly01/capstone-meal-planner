import React from 'react';
import Home from '@/components/Home';
import Head from 'next/head';

export default function home() {
	return(
		<>
			<Head>
					<title>Meal Planner</title>
					<meta name='description' content='Generated by create next app' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
				</Head>
			<Home/>
		</>
	)
}