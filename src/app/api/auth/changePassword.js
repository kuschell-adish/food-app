import { supabase } from "@/app/lib/supabaseClient";

export async function handleChangePassword(password) {
    try {
      const { error } = await supabase.auth.updateUser({password}); 
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, message: 'password has been changed' };
    }
    catch (error) {
      return { success: false, message: error.message };
    }
  }