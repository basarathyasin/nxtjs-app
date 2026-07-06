"use client";

import { create } from "zustand";

import {
	emptyLeadFormValues,
	type LeadFormValues,
} from "@/components/forms/multistep-drawer/schema";

type LeadFormStore = {
	draft: LeadFormValues;
	setDraft: (values: LeadFormValues) => void;
	clearDraft: () => void;
};

export const useLeadFormStore = create<LeadFormStore>((set) => ({
	draft: emptyLeadFormValues,
	setDraft: (values) => set({ draft: values }),
	clearDraft: () => set({ draft: emptyLeadFormValues }),
}));
