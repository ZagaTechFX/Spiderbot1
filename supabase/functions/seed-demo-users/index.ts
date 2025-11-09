import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.80.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface DemoUser {
  email: string;
  password: string;
  displayName: string;
  role: 'user' | 'admin';
}

const demoUsers: DemoUser[] = [
  {
    email: "demo@spiderbot.io",
    password: "Demo@12345",
    displayName: "Demo User",
    role: "user",
  },
  {
    email: "admin@spiderbot.io",
    password: "Admin@12345",
    displayName: "Admin User",
    role: "admin",
  },
  {
    email: "trader@spiderbot.io",
    password: "Trader@12345",
    displayName: "Pro Trader",
    role: "user",
  },
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const results = [];

    for (const user of demoUsers) {
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
        });

        if (authError) {
          console.error(`Error creating auth user: ${user.email}`, authError);
          results.push({
            email: user.email,
            status: "error",
            message: authError.message,
          });
          continue;
        }

        if (!authData.user) {
          results.push({
            email: user.email,
            status: "error",
            message: "No user returned from auth",
          });
          continue;
        }

        const { error: profileError } = await supabase
          .from("users")
          .insert({
            id: authData.user.id,
            username: user.email.split("@")[0],
            display_name: user.displayName,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
            role: user.role,
            kyc_status: "Verified",
            subscription_plan: user.role === "admin" ? "Enterprise" : "Pro",
          });

        if (profileError) {
          console.error(`Error creating profile: ${user.email}`, profileError);
          results.push({
            email: user.email,
            status: "error",
            message: profileError.message,
          });
          continue;
        }

        results.push({
          email: user.email,
          status: "success",
          message: "User created successfully",
          userId: authData.user.id,
          role: user.role,
        });
      } catch (err) {
        console.error(`Error for user: ${user.email}`, err);
        results.push({
          email: user.email,
          status: "error",
          message: String(err),
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Demo users seed operation completed",
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in seed-demo-users:", error);

    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
