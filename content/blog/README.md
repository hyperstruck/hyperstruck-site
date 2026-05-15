# Blog Writing Guide

Rules for writing Hyperstruck blog posts that sound like us, convert readers, and don't read like AI output.

## Voice

- **Lead with why the reader should care, not what the system does.** The reader's pain comes first. The product is the proof, not the topic.
- **Be confident.** We built real technology. Don't hedge with "can help", "is designed to", "at a high level". Say what it does.
- **Stay grounded.** Confident is not hype. Every claim should be backed by something the product actually does. Substance over vibes.
- **Use "agents" not "AI tools", "your AI", "AI assistants", or "coding assistants".** Hyperstruck is an intelligence layer for agents. The language should reflect the space we're in.
- **Use "AI" not "artificial intelligence".** Spelling it out every time reads like an academic paper.

## Structure

- **Put the strongest content at the top.** If your best paragraph is in the conclusion, move it to the opening.
- **Cut aggressively.** Blog posts are not documentation. No accordion sections, no "when to use" guides, no feature matrices. Those belong on a docs page.
- **Let demos speak for themselves.** If there's a video, frame what to watch for. Don't narrate every detail the reader is about to see.
- **End on a strong line, not a sales pitch.** No signup CTAs at the bottom. If the post did its job, the reader is already convinced. Site navigation handles conversion.
- **Name competitors once, early, when defining the problem.** LangGraph, OpenAI Agents SDK, CrewAI, etc. Frame as shared experience ("if you've built with X, you know the pattern"), not as an attack. Then never mention them again. The rest of the post is about our value, not their limitations.

## Avoiding AI-generated tells

These patterns are dead giveaways that a post was written by a language model:

- **Dramatic standalone thesis statements.** A one-liner on its own line after a list. Fold it into the surrounding paragraph.
- **Direct reader address as a transition.** "And here's the part that should worry you:" or "Let's break this down." Just state the point.
- **Jargon dressed up as insight.** "Accumulated organizational intelligence", "operationalize learnings", "holistic approach". Use words you'd say out loud.
- **Anthropomorphising comparisons.** "The same way a senior engineer would." The system isn't a person. Say what it does, not who it's like.
- **Parallel fragment repetition.** "Between X that generates and X that improves. Between X that answers and X that learns." This is a signature AI writing pattern.
- **LinkedIn cliches.** "Knowledge walks out the door", "move the needle", "unlock value". Write something specific instead.
- **Em dashes.** Use commas, periods, or separate sentences. Em dashes are the most common AI writing tell.
- **Numbered lists of benefits that all follow the same sentence template.** Vary the structure or use a different format entirely.

## IP Protection

We believe we're building genuinely novel technology. Blog posts should sell the value without giving away the how.

- **Describe outcomes, not mechanisms.** Say what the system produces, not how it works internally.
- **Never describe architecture, retrieval strategies, learning taxonomies, or engine internals.** These are competitive advantages.
- **Never name internal architectural components.** Don't mention reflection, validation loops, milestones, planning passes, or any other named stage of the engine. A competent engineer reading those terms gets a free blueprint.
- **Show what a user experiences, not what the system does under the hood.** A reader should think "I want that" not "I could build that."
- **Product names (Hyper Reasoning, Hyper Learning) are fine.** The internal workings behind them are not.
- **Claim results without explaining what produces them.** "The quality floor is higher" is fine. "Because we do reflection and validation" is giving away the recipe.

If you're unsure whether something reveals too much, ask: could a competent engineer read this and replicate the approach? If yes, cut it.

## Checklist before publishing

1. Read every sentence out loud. Would you actually say this to a colleague? If not, rewrite it.
2. Search for em dashes. Remove all of them.
3. Search for "your AI". Replace with "agents" or something specific.
4. Check that the first two paragraphs make the reader care, not describe the product.
5. Check that the post doesn't end on a CTA or sales ask.
6. Check the length. If it's over 100 lines of content, find what to cut.
7. IP check: could a competent engineer read this and replicate the approach? If yes, cut the detail.
