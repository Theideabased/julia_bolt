import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { CompetitionDemo } from '~/components/juliaos/CompetitionDemo';

export const meta: MetaFunction = () => {
  return [
    { title: 'IntelliTrade AI - JuliaOS Competition Demo' },
    { name: 'description', content: 'Multi-Agent DeFi Strategy Platform for JuliaOS Competition' },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  return json({
    juliaOSEnabled: true,
    agentCount: 12,
    swarmCount: 3,
    competitionReady: true,
  });
}

export default function JuliaOSRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-bolt-elements-background-depth-1">
      <CompetitionDemo />
    </div>
  );
}
