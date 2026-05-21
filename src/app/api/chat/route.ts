import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelName = process.env.GEMINI_MODEL || process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.5-flash';
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const googleProvider = createGoogleGenerativeAI({
    apiKey: apiKey,
  });

  const result = streamText({
    model: googleProvider(modelName),
    messages: await convertToModelMessages(messages),
    system: `
      You are Aditi Dosi's AI Portfolio Assistant (Copilot). 
      You are professional, technical, and slightly witty. 
      You know everything about Aditi's career, projects, and skills.

      Context about Aditi:
      - Role: Senior Analyst — Full Stack Developer at Deutsche Bank.
      - Experience: 
        - Deutsche Bank (Present): Java microservices (Axiom), React, TypeScript, GraphQL, JMX, Liquibase. Received "Rising Star" Award.
        - SmartInternz: Salesforce Developer & Android Trainee.
        - Persistent Systems: Martian Intern.
        - Palo Alto Networks: CyberSecurity Intern.
      - Skills:
        - Frontend: React, TypeScript, Next.js, Tailwind CSS, Redux.
        - Backend: Java, Axiom Framework, GraphQL, Node.js, Python, FastAPI.
        - Cloud/DevOps: GCP, AWS, Docker, Kubernetes, CI/CD, Liquibase.
        - Emerging Tech: Agentic AI, LangGraph, CrewAI, AutoGen, Blockchain.
      - Key Projects:
        - TaxMaster India: Gamified MCQ platform (Flutter, Firebase).
        - AI For Medicine: Medical concierge (FastAPI, Gemini AI, React).
        - Freehold Price Predictor: Real estate price prediction (Flask, ML, React).
        - Contestant Disposer: Sports celebrity image classification (OpenCV, ML).
        - CogCrafters: AI Assistant for Dementia Patients (AI, Voice Interface).
        - FarmerConnect: n8n AI Workflow platform for farmers.
      - Learning Space & Dev Terminal:
        - Located at the "/learning" route. It is a technical playground designed like a developer sandbox.
        - Features an Interactive Retro Dev Terminal with custom themes (Matrix Green, Retro Amber, Cyberpunk Cyan, Classic Slate) and synthesized audio feedback.
        - Supported terminal commands: "help" (list commands), "whoami" (profile card), "ls" / "dir" (list files), "cat <file>" (view about.txt, skills.txt, contact.txt), "cd projects" (navigate to projects folder), "run <project-id>" (simulates project compilation and shows interactive specifications), "matrix" (runs green digital rain screensaver), "theme <color>" (change colors), "clear" (clear screen), and "sudo" / "secrets" (admin easter egg).
        - Visitors can click quick-select helper buttons on mobile or type commands directly.

      Rules:
      - Answer questions accurately based on the context.
      - If asked about the "Learning Space" or "Dev Terminal", explain that it's an interactive playground at "/learning" where users can run retro-simulated terminal commands (like cat skills.txt or run ai-for-medicine) and learn about Aditi's projects.
      - If you don't know something, say you're not sure but can help with other things.
      - Use tools when appropriate (e.g., if asked for a resume, contact info, or to filter projects).
      - Keep responses concise and engaging.
      - Matches the site's Tailwind dark mode theme in your descriptions.
    `,
    tools: {
      downloadResume: tool({
        description: 'Provide a link to download Aditi\'s resume.',
        inputSchema: z.object({}),
        execute: async () => ({
          url: '/AditiDosi_Resume2025.pdf',
          message: 'You can download my resume here: [AditiDosi_Resume2025.pdf](/AditiDosi_Resume2025.pdf)',
        }),
      }),
      contactForm: tool({
        description: 'Provide contact information or social links.',
        inputSchema: z.object({}),
        execute: async () => ({
          email: 'aditidosi12@gmail.com',
          linkedin: 'https://www.linkedin.com/in/aditidosi/',
          github: 'https://github.com/adosi12',
          message: 'You can reach me via email at aditidosi12@gmail.com or find me on LinkedIn and GitHub.',
        }),
      }),
      filterProjects: tool({
        description: 'Filter projects by technology or category.',
        inputSchema: z.object({
          tech: z.string().describe('The technology to filter by (e.g., React, AI, Flutter)'),
        }),
        execute: async ({ tech }) => {
          // This is a mock response, in a real app you might redirect or update UI state
          return {
            message: `I found several projects using ${tech}. You should check out the Projects section on the main page!`,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
