import { Dispatch, SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SuccessModal({ open, setOpen }: Props) {
	const router = useRouter();
	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md dark:border-white/10 dark:bg-[#101214]">
					<DialogHeader className="items-center text-center">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-emerald-400/15">
							<span className="text-3xl">✅</span>
						</div>

						<DialogTitle className="text-2xl font-semibold dark:text-white">
							Account Created Successfully!
						</DialogTitle>

						<DialogDescription className="mt-2 text-sm text-muted-foreground">
							Your account has been created successfully. You can now access
							your dashboard and start using the application.
						</DialogDescription>
					</DialogHeader>

					<Button
						className="mt-6 w-full"
						onClick={() => {
							setOpen(false);
							router.replace("/dashboard");
						}}
					>
						Continue to Dashboard
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
