import React from "react";

function Layout({ children }) {
	return (
		<div className="overflow-auto min-w-full min-h-screen h-screen  bg-background">
			<main className="px-5 sm:px-20 pt-2">{children}</main>
		</div>
	);
}

export default Layout;
