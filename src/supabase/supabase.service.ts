import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;
  constructor() {
    this.client = createClient(
      'https://jkeioxgnfrmifbtubvxr.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZWlveGduZnJtaWZidHVidnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwNTkyMzMsImV4cCI6MjAwNzYzNTIzM30.7y7GH_cTvVcb81QVvUav7Xko6UyJqMkqCiYZyuICkO8',
      // process.env.SUPABASE_URL,
      // process.env.SUPABASE_KEY,
    );
  }
}
