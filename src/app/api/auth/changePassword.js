import { supabase } from "@/app/lib/supabaseClient";

export async function handleChangePassword(password, token) {

    if(!password || !token) {
      return { success: false, message: "password and token are required" };
    }

    try {
      const { data, error } = await supabase.auth.api
        .updateUser(token, {password}); 
      
      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'password has been changed' };
    }
    catch (error) {
      return { success: false, message: error.message };
    }
  }