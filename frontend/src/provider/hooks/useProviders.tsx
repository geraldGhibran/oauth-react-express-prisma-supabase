import { supabaseClient } from "@/config/supabase-client";
import {
    Box,
    useToast
} from "@chakra-ui/react";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
export const useProviders = () => {
    const [signedIn, setSignedIn] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>();
    const toast = useToast();
    const [event, setEvent] = useState<AuthChangeEvent>();
  
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
        setEvent(event);
      }
      if (event === "SIGNED_IN") {
        setSignedIn(true);
        setEvent(event);
      }
    });
  
    const showToast = useCallback(
      (e: any) => {
        toast({
          position: "bottom",
          render: () => (
            <Box color="white" borderRadius={"md"} p={3} bg={e === "SIGNED_IN" ? `green.500` : `red.500`}>
              {e === "SIGNED_IN" ? `Signed In` : `Signed Out`}
            </Box>
          ),
        });
      },
      [toast]
    );
  
    useEffect(() => {
      if (event) showToast(event);
  
      const setData = async () => {
        const {
          data: { session },
          error,
        } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (session) {
            Cookies.set('token', session.access_token);

          setSession(session);
          // console.log('session from App', session.access_token)
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      };
      setData();
    }, [event, showToast]);

    return {
        signedIn,
        session,
        setSession,
        setSignedIn,

    }
};