export interface ILoginActivity {
  id: number;
  scope: string | null;
  strategy: string | null;
  identity: string | null;
  success: boolean | null;
  failure_reason: string | null;
  user_type: string | null;
  user_id: number | null;
  context: string | null;
  ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  device_type: string | null;
  device_name: string | null;
  os_name: string | null;
  os_version: string | null;
  browser_name: string | null;
  browser_version: string | null;
}

export interface ILoginActivityResource {
  id: string;
  type: 'login_activity';
  attributes: ILoginActivity;
}

export interface ILoginActivityResponse {
  data: ILoginActivityResource[];
}
