import type { AgentId } from '../content/types'

/** Background class per role. Literal classes so Tailwind can detect them. */
export const roleBg: Record<AgentId, string> = {
  'tech-lead': 'bg-role-tech-lead',
  'product-owner': 'bg-role-product-owner',
  'business-analyst': 'bg-role-business-analyst',
  architect: 'bg-role-architect',
  'ux-designer': 'bg-role-ux-designer',
  'backend-dev': 'bg-role-backend-dev',
  'frontend-dev': 'bg-role-frontend-dev',
  'qa-engineer': 'bg-role-qa-engineer',
  'code-reviewer': 'bg-role-code-reviewer',
  'security-engineer': 'bg-role-security-engineer',
  'devops-sre': 'bg-role-devops-sre',
  'tech-writer': 'bg-role-tech-writer',
}

/** Top border class per role, used by the roster cards. */
export const roleBorderTop: Record<AgentId, string> = {
  'tech-lead': 'border-t-role-tech-lead',
  'product-owner': 'border-t-role-product-owner',
  'business-analyst': 'border-t-role-business-analyst',
  architect: 'border-t-role-architect',
  'ux-designer': 'border-t-role-ux-designer',
  'backend-dev': 'border-t-role-backend-dev',
  'frontend-dev': 'border-t-role-frontend-dev',
  'qa-engineer': 'border-t-role-qa-engineer',
  'code-reviewer': 'border-t-role-code-reviewer',
  'security-engineer': 'border-t-role-security-engineer',
  'devops-sre': 'border-t-role-devops-sre',
  'tech-writer': 'border-t-role-tech-writer',
}

/** Text color over a role-colored chip: dark, except devops-sre (white). */
export const roleChipText: Record<AgentId, string> = {
  'tech-lead': 'text-on-role',
  'product-owner': 'text-on-role',
  'business-analyst': 'text-on-role',
  architect: 'text-on-role',
  'ux-designer': 'text-on-role',
  'backend-dev': 'text-on-role',
  'frontend-dev': 'text-on-role',
  'qa-engineer': 'text-on-role',
  'code-reviewer': 'text-on-role',
  'security-engineer': 'text-on-role',
  'devops-sre': 'text-on-role-invert',
  'tech-writer': 'text-on-role',
}
