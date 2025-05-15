import { supabase } from "@/app/lib/supabaseClient";

export async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
    });

    if (error) {
        console.error("error logging in", error.message); 
        return { success: false, message: error.message };
    }

    console.log("sucessful logging in", data);
    return { success: true, user: data.user };
}