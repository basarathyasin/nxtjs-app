import { z } from "zod";

export const leadFormSchema = z.object({
	firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
	email: z.string().trim().email("Enter a valid email address"),
	company: z.string().trim().min(2, "Company name is required"),
	teamSize: z.enum(["1-10", "11-50", "51-200", "201+"]),
	goal: z.string().trim().min(10, "Tell us a little more about the goal"),
	budget: z.enum(["under-5k", "5k-15k", "15k-50k", "50k-plus"]),
	timeline: z.enum(["this-month", "next-quarter", "exploring"]),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const emptyLeadFormValues: LeadFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	company: "",
	teamSize: "1-10",
	goal: "",
	budget: "5k-15k",
	timeline: "next-quarter",
};
