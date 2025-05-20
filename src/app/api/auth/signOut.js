import { supabase } from "@/app/lib/supabaseClient";

export async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("error logging out", error.message); 
        return { success: false, message: error.message };
    }

    console.log("sucessful logging out");
    return { success: true};
}