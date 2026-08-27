# AI Workplace Helper

Create a modern, responsive frontend-only SaaS web application called AI Workplace Productivity Assistant.

The app is a professional workplace productivity dashboard that helps users generate emails, research topics, and interact with an AI workplace assistant.

IMPORTANT CONSTRAINTS

Frontend only — no backend

No database

No login

No registration

No authentication

Do not create user accounts or profile management.

The application must work as a standalone prototype/demo.

Keep the project lightweight and suitable for a free Lovable account.

Do not require paid APIs or external services.

Use realistic simulated/demo AI responses so all features can be demonstrated without a backend.

DESIGN STYLE

Create a polished, modern SaaS dashboard inspired by professional productivity applications.

Use this colour direction:

Navy: main background

Slate: sidebar and secondary surfaces

Blue: primary buttons and active navigation

Teal: accents and highlights

Light gray/white: text and readable content

Green: success status

Amber: warnings

Red: errors or important alerts

Use:

Clean typography

Rounded cards

Subtle borders

Modern icons

Good spacing

Clear visual hierarchy

Smooth hover states and transitions

Professional dashboard layout

Responsive design for desktop, tablet, and mobile

SIDEBAR NAVIGATION

Create a fixed/collapsible left sidebar containing:

Dashboard

Smart Email Generator

AI Research Assistant

AI Chatbot

Settings

At the bottom of the sidebar, include a small Responsible AI indicator.

On mobile, convert the sidebar into a responsive menu/drawer.

DASHBOARD HOME

Create a welcoming dashboard with:

Header:
“Good morning 👋”
“Your AI workplace assistant is ready to help.”

Display three main feature cards:

Smart Email Generator
Generate professional workplace emails in seconds.

Button: “Generate Email”

AI Research Assistant
Summarise topics, extract key insights, and generate recommendations.

Button: “Start Research”

AI Workplace Chat
Ask questions and get assistance with everyday workplace tasks.

Button: “Open AI Chat”

Also include a small Quick Actions section with:

Write an Email

Summarise a Topic

Ask AI

Improve Text

SMART EMAIL GENERATOR

Create a dedicated email-generation interface.

Include:

Recipient/purpose field

Email subject field

Main instruction/prompt textarea

Tone selector:

Formal

Friendly

Persuasive

Optional length selector:

Short

Medium

Detailed

Primary button:
Generate Email

After generation, show the result inside an editable text editor/card.

Include buttons:

Regenerate

Copy

Clear

The generated email should look professional and realistic.

AI RESEARCH ASSISTANT

Create a research workspace containing:

Topic/question input

Optional article/text input

Research focus selector

“Summarise & Analyse” button

Display results in organised sections:

Summary
A concise explanation of the topic.

Key Insights
Important points presented as readable cards or bullet points.

Recommendations
Useful suggestions based on the research.

Action Points
Practical next steps.

Make all generated content editable.

Include:

Copy

Regenerate

Clear

AI CHATBOT

Create a modern conversational AI interface.

Include:

Chat history area

User message bubbles

AI response bubbles

Text input

Send button

Above the input, provide suggested workplace prompts such as:

“Help me write a professional email.”

“Summarise this information.”

“Help me prepare for a meeting.”

“Improve this piece of writing.”

“Create a project plan.”

The chatbot should use simulated responses so it works without a backend.

STRUCTURED AI PROMPTS

Use clear prompt structures behind the interface so each tool produces focused responses.

For example:

Email Prompt Structure
Purpose → Context → Tone → Length → Desired Output

Research Prompt Structure
Topic → Context → Focus → Summary → Insights → Recommendations

Chat Prompt Structure
User Question → Workplace Context → Helpful Response → Suggested Next Step

The UI should make these prompt structures feel simple to the user without exposing unnecessary technical details.

EDITABLE AI OUTPUTS

All AI-generated content must be editable.

Use suitable textareas or editable content areas so users can modify the generated results before copying or using them.

RESPONSIBLE AI DISCLAIMER

Add a visible but unobtrusive disclaimer throughout the application:

“AI-generated content may contain errors or inaccurate information. Always review and verify AI outputs before using them for important workplace communications, decisions, or research.”

Include a small Responsible AI section in Settings explaining that users remain responsible for reviewing AI-generated content.

SETTINGS PAGE

Since there is no login or user account, keep Settings simple.

Include:

Theme/display preferences

Interface preferences

Responsible AI information

About the application

Do not add account management, passwords, authentication, or profile settings.

INTERACTION & UX

Make the application feel functional even though it is frontend-only.

Include:

Loading states when generating content

Empty states

Success notifications

Copy-to-clipboard feedback

Button hover states

Responsive navigation

Clear error/validation messages

Smooth transitions

Use realistic sample/demo AI outputs when the user interacts with the tools.

FINAL GOAL

The finished application should look like a professional AI productivity SaaS platform, not a basic form or static website.

Prioritise:
simplicity + professional design + usability + responsive layout + realistic AI interactions + frontend-only functionality.

Do not add unnecessary features that require a backend, database, authentication, subscriptions, or paid APIs.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb9dc627-2e0a-4d66-812d-110cce9e5dc7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
