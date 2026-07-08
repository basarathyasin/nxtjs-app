"use client";

import { useEffect } from "react";

export default function ComponentInspector() {
	useEffect(() => {
		if (process.env.NODE_ENV !== "development") {
			return;
		}

		void import("@locator/runtime").then(({ default: setupLocator }) => {
			setupLocator({
				adapter: "jsx",
				showIntro: false,
			});
		});
	}, []);

	return null;
}
