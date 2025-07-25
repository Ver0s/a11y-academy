"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
	const supabase = await createClient();
	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email,
		password,
	};
	const { error } = await supabase.auth.signInWithPassword(data);
	if (error) {
		redirect("/error");
	}
	revalidatePath("/", "layout");
	redirect("/");
}

export async function signUp(email: string, password: string) {
	const supabase = await createClient();
	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email,
		password,
	};
	const { error } = await supabase.auth.signUp(data);
	if (error) {
		redirect("/error");
	}
	revalidatePath("/", "layout");
	redirect("/");
}

export async function signOut() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
