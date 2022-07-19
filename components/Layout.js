import React from "react";

function Layout({ children }) {
	return (
		<div className="min-w-full min-h-screen h-screen overflow-hidden bg-background">
			<main className="px-5 sm:px-20 pt-16">{children}</main>
		</div>
	);
}

export default Layout;
