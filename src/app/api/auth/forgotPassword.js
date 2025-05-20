import { supabase } from "@/app/lib/supabaseClient";

export async function handleForgotPassword(email) {
    const redirectUrl = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl, 
    });
  
    if (error) {
      return { success: false, message: error.message };
    }
  
    return { success: true, message: "reset email sent!" };
  }