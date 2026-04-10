#!/usr/bin/env bash
# gemini-context.sh — Read-only context synthesizer using Gemini CLI
#
# Usage:
#   ./scripts/gemini-context.sh <mode> --task "<description>" [--path <dir>]
#
# Modes:
#   query-plan    Analyze codebase and plan a query or feature approach
#   doc-review    Summarize docs or markdown files
#   repo-pattern  Find how a concept/pattern is implemented across the repo
#
# Examples:
#   ./scripts/gemini-context.sh query-plan  --task "Plan a query for user retention"
#   ./scripts/gemini-context.sh doc-review  --task "Summarize all auth-related docs"
#   ./scripts/gemini-context.sh repo-pattern --task "Find how caching is implemented"

set -euo pipefail

MODE="${1:-}"
TASK=""
SEARCH_PATH="."

shift || true

while [[ $# -gt 0 ]]; do
  case "$1" in
    --task)
      TASK="$2"
      shift 2
      ;;
    --path)
      SEARCH_PATH="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$MODE" || -z "$TASK" ]]; then
  echo "Usage: $0 <mode> --task \"<description>\" [--path <dir>]" >&2
  echo "Modes: query-plan | doc-review | repo-pattern" >&2
  exit 1
fi

build_prompt() {
  local mode="$1"
  local task="$2"
  local path="$3"

  case "$mode" in
    query-plan)
      cat <<EOF
You are a read-only code analyst. Do NOT suggest executing commands, modifying files, or making architectural decisions.

Task: $task

Search path: $path

Read the relevant source files and:
1. Identify the files and functions related to this task
2. Summarize how the existing code works in this area
3. List any patterns or utilities already in place that should be reused
4. Highlight any gaps or considerations for implementation

Output a concise, structured report. Do not write any code or make final decisions.
EOF
      ;;
    doc-review)
      cat <<EOF
You are a read-only documentation reviewer. Do NOT suggest executing commands or modifying files.

Task: $task

Search path: $path

Read all relevant markdown, toml, and config files and:
1. Summarize the key information relevant to the task
2. Identify any inconsistencies or gaps in the docs
3. List the files you read

Output a concise, structured summary. Do not make final recommendations — leave judgment to the engineer.
EOF
      ;;
    repo-pattern)
      cat <<EOF
You are a read-only code pattern analyst. Do NOT suggest executing commands or modifying files.

Task: $task

Search path: $path

Search across the repository and:
1. Find where and how this pattern/concept is implemented
2. List the relevant files and functions with brief descriptions
3. Describe the pattern's structure and any conventions used
4. Note any variations or edge cases

Output a concise, structured report. Do not write code or make architectural judgments.
EOF
      ;;
    *)
      echo "Unknown mode: $mode. Use query-plan | doc-review | repo-pattern" >&2
      exit 1
      ;;
  esac
}

PROMPT="$(build_prompt "$MODE" "$TASK" "$SEARCH_PATH")"

echo "==> Running Gemini context synthesis: [$MODE] $TASK"
echo "==> Path: $SEARCH_PATH"
echo ""

# Pass the repo files as context via stdin or include path in prompt
# gemini -p reads from stdin; we pipe the prompt and let Gemini read local files via its context window
echo "$PROMPT" | gemini -p "$SEARCH_PATH"
