export async function POST(request: Request) {
  const { description, platforms } = await request.json();

  // Mock generation for MVP (replace with real AI call)
  const result = {
    titles: [
      `${description.slice(0, 50)}... - Built with AI`,
      `Introducing: ${description.split(' ').slice(0, 5).join(' ')}`,
    ],
    shortSummary: `${description.slice(0, 200)}... Try it now!`,
    longSummary: `${description}\n\nKey features:\n- Fast generation\n- Multi-platform support\n- No login required\n\nPerfect for developers and creators who need to distribute content quickly.`,
    hashtags: '#AI #productivity #automation #buildinpublic #indiehacker',
    ctas: [
      'Try it free →',
      'Get started now',
      'Check it out',
    ],
  };

  return Response.json(result);
}
