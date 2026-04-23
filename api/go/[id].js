import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.redirect(302, 'https://taploop.info');
  }

  const keychainId = id.toUpperCase();

  const { data, error } = await supabase
    .from('keychains')
    .select('destination_url, is_claimed')
    .eq('id', keychainId)
    .single();

  if (error || !data) {
    return res.redirect(302, `https://taploop.info/claim?id=${keychainId}`);
  }

  if (!data.is_claimed || !data.destination_url) {
    return res.redirect(302, `https://taploop.info/claim?id=${keychainId}`);
  }

  await supabase.from('scans').insert({
    keychain_id: keychainId,
    scanned_at: new Date().toISOString(),
    user_agent: req.headers['user-agent'] || null,
  });

  return res.redirect(302, data.destination_url);
}
