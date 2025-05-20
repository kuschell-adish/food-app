import { supabase } from "@/app/lib/supabaseClient";

export async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
    });

    if (error) {
        return { success: false, message: error.message };
    }
    return { success: true, user: data.user };
}