import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { JuliaOSManager } from '~/components/juliaos/JuliaOSManager';

export const meta: MetaFunction = () => {
  return [
    { title: 'JuliaOS Competition Platform - IntelliTrade AI' },
    { name: 'description', content: 'Multi-Agent DeFi Strategy Platform for JuliaOS Competition' },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  return json({
    juliaOSEnabled: true,
    competitionReady: true,
    platform: 'IntelliTrade AI',
  });
}

export default function JuliaOSRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50">
      <JuliaOSManager />
    </div>
  );
}
